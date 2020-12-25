---
layout: post
title: Kafka server disconnected
category: code
date: 2020-12-23
---

The Wealthfront data engineering team is a heavy user of Apache Kafka - we’ve built many of the streaming applications (link to another blog post?) that power the Wealthfront client experience around it. The multiple-producer, multiple-consumer persistent model is especially valuable for streaming use cases where we want to build in analytics on the streamed data. For example, if we have third-party transactions processing through Kafka, we can use Kafka as a source for both application logic *and* batch ETLs for offline analytics.

We embarked on a journey recently to refactor our external account linking flow to support multiple third-party providers. Our existing linking provider, Quovo, is deprecated after its acquisition by Plaid. The linking team settled on [Yodlee](https://www.yodlee.com/) as our next vendor for linking external accounts. Not only was this a big project on its own, but it also gave us the opportunity to rethink our offline and online data flows. We decided to use the Yodlee project as a starting point for a much larger effort to delve deeper into using AWS. We’re excited about where 

This blog post is focused on a small issue inherent in the process of migrating hosted Kafka producers to a massively parallel serverless processing environment like AWS Lambda.

We recently productionalized a project to handle Yodlee data updates through webhooks. These are essentially microbatches of new transactions coming in from Yodlee’s syncs with other financial institutions. Our linking backend translates these transactions from the Yodlee schema into a generic format and further downstream will classify them into categories like savings and spending. But first, we need to actually make requests to Yodlee’s API to retrieve the transactions in a parallel manner before sending them to Kafka. AWS Lambda is the most obvious solution for this - it’s super robust to quick changes in throughput. 

If you have used Lambda before you may know that latency-sensitive applications often need  to implement warming, since [cold starts](https://lumigo.io/blog/this-is-all-you-need-to-know-about-lambda-cold-starts/) of Lambda functions can take on the order of several seconds before execution can begin. This is because Lambda initializes a container environment specific for your function invocation. If there is a large time gap between invocations, you may see another Lambda worker initialized for each invocation. This behavior is unfortunately nondeterministic, so you won’t know if your invocation occurs on an existing Lambda worker or a new one.

There are certainly many benefits to the Lambda worker model, besides the obvious benefit of a lower average latency for invocations. At Wealthfront, we write mostly Java Lambda functions, and we use Guice for dependency injection. Having long-standing Lambda workers means that injected members of a class can persist between invocations. One instance where this helps is the case of connecting to RDS, where we are much more likely to get [rate limited](https://docs.amazonaws.cn/en_us/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html) if each Lambda invocation initializes its own connection. Saving connections between invocations helps us reach a much higher scale without worrying about rate limiting.

The persistence of Lambda workers between invocations is not always good, though. A few weeks ago, we productionalized our Yodlee data update requester Lambda function. This function is invoked once for every element in each microbatch of data updates. It then sends the Yodlee response via Kafka to our backend. When our linking team turned on Yodlee’s webhook requests and we started linking Yodlee accounts internally, we started to see this error approximately once a day in our exception router:

```
ERROR The server disconnected before a response was received. “org.apache.kafka.common.errors.NetworkException: The server disconnected before a response was received.”
WARN [Producer clientId=169.254.121.157] Received invalid metadata error in produce request on partition prod-KAFKA_DIRECT-stream-link-external_api_requests-0 due to org.apache.kafka.common.errors.NetworkException: The server disconnected before a response was received.. Going to request metadata update now"
```

Since we productionalized the Yodlee flow after we deployed this function initially, we didn’t see this until a critical mass of transactions were flowing through the system. CloudWatch logs are notoriously difficult to search through, but luckily we have routed Lambda logs to our Kibana instance (I’ll document our approach to this in a future blog post). Kibana pointed at our new Lambda as well as another Lambda in an integration test we had separately written (that wasn’t throwing exceptions to our exception router).

When I located the CloudWatch log group with these error messages, I found that these errors are all from Lambda invocations occurring *well after* the log group’s previous logs. Specifically, more than ten minutes after. This was a clue: each Lambda worker creates its own CloudWatch log group. So these time gaps indicated that a single worker had requests spaced out by more than 10 minutes. After spot-checking some log groups that did not contain this error message, it was clear that the time gap was the root of the problem. I discovered that Kafka brokers have a configuration property, [connections.max.idle.ms](https://docs.confluent.io/platform/current/installation/configuration/broker-configs.html#connections.max.idle.ms), that dictates when to drop a client connection. By default, if a Kafka client connection is idle for 10 minutes, the broker will drop the connection. Since Lambda worker reuse is nondeterministic (at least to the client), we were very occasionally reusing workers that had been idle for more than 10 minutes. Kafka dropped the connection, and we got the error message above.

Why didn’t this happen from our backend producers? We use singleton Kafka producers from our microservices, and these services are sending high-throughput data streams like user events through Kafka. Since all messages are routed through the same producer on the service (as opposed to Lambda, where each worker has its own producer), the likelihood of ten minutes of idle time is very low.

The solution to fix our Lambdas was to use an expiring provider - instead of providing a Kafka producer via Guice injection, we provide a *provider* to a Kafka producer that will go retrieve a new instance if the previous instance has a connection that has been dropped.

This pattern likely applies to a wide variety of other use cases - including the RDS use case above. We haven’t seen the issue since applying the fix. Hopefully this helps someone out there running into the same Kafka connection issue.

I found the following articles from the AWS blog fairly interesting:
[This post](https://aws.amazon.com/blogs/compute/using-self-hosted-apache-kafka-as-an-event-source-for-aws-lambda/) introduces the use of self-hosted Kafka topics as input triggers to Lambda. Our team hosts Kafka in EC2, and this could assist in some future use cases.
[This post](https://aws.amazon.com/blogs/compute/using-self-hosted-apache-kafka-as-an-event-source-for-aws-lambda/) introduces provisioned concurrency to reduce the impact of cold starts on latency-sensitive workloads. Our batch computation of data updates is not latency-sensitive, but other workloads may be.


