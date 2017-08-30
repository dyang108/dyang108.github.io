---
layout: post
title: Pitfalls of falsy values
category: code 
date: 2017-07-23
---

Suppose you want to create a class `MyClass` in JavaScript. In this class, you want to have some data structure with with arbitrary elements, and you define a getter and a setter for that array:

{% highlight javascript %}
class MyClass {
    constructor () {...}

    addToElems (elem) {...}

    removeFromElems (elem) {...}
}
{% endhighlight %}

One thing you don't want to do is let people add to elems without defining an element: 

{% highlight javascript %}
var x = new MyClass()
x.addToElems()
{% endhighlight %}

While you're at it, you decide you also don't want to let clients insert null values. So you decide to do something perfectly reasonable, rather elegant, and easy to understand:

{% highlight javascript %}
addToElems (elem) {
    if (!elem) {
        return
    }
    ...
}
{% endhighlight %}

Don't do that. The thing is, now you can't add any falsy values to `elems`. In JavaScript, this means the empty string, 0, `false`, and `NaN`, in addition to `null` and `undefined`. If you want the client to add arbitrary elements to the internal data structure, you have to be explicit about what you want to put in.

I've spent probably the equivalent of two work days cleaning up exactly this issue, which I found throughout the library I am building upon.

I should note that this issue exists in dynamically typed languages in general. Most recently, however, I have dealt with it a lot in JavaScript.
