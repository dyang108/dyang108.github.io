---
layout: post
title: Perfectionism
category: blog 
date: 2016-04-22
background: 
---

I'm a perfectionist. And it's the worst.

Let me explain. First of all, it annoys the hell out of me that this line will probably be split up by the div separating each post blurb. Maybe I'll get over it someday. But there are other, more significant things that annoy me more. Like the fact that I probably used the wrong framework for this site altogether. Based on the simplicity of others' Jekyll sites, I feel like I have used the tool past what it should be used for. Templating is great and all, but I feel like I could've had a much easier time designing my site if I had just thought more about what I wanted it to be.

There's a few things that culminated in this rant on perfectionism. Maybe it's growing up in the era after Steve Jobs. Maybe it's the era of Bootstrap. Maybe it's just me. But in particular, code linters, prettifying tools, working in a group, and a desire to use every single web development tool *exactly as it was meant to be used* led me on the rant.

Thanks to [MJ](https://github.com/maxjacobson), I've been using linters with all the code I write. It's a blessing and a curse. It's a fantastic way to catch errors before compilation/deployment/committing. If you use Sublime Text, SublimeLinter is probably the best thing ever. *EXCEPT* when it's not.

Let me explain again. [No one likes JavaScript](/blog/2016/03/everyone-hates-javascript). But everyone developing on the web has to use it. Probably one of the worst things about JavaScript is the way it looks. Namely, the chain of closing brackets and braces that you find at the end of a chain of callbacks. Or the shameless heterogeneity of JQuery mixed in with JavaScript. Or the fact that it has to deal with the document object model at all.

Linting tools work to make code as stylish as possible. In the case of JavaScript, tools like JSHint and Standard help to make your code as pretty as JavaScript can possibly be (which is not that pretty). Essentially, these tools are setting a universal code style standard that everyone should use. **Except they don't.** That's right. These tools, designed to make the world a better place by setting *standards* for code style, *don't even agree with each other*. It's like the world of JavaScript developers is locked in a civil war, and no one knows the best way to make JS look pretty (I mean, to be fair, it isn't easy). But can't we all just *agree* on some code style standards??? Even my JS Prettify plugin doesn't agree with the so-called Standard linter. Do we need semicolons or not? Four space indents or two? (I'm fond of four spaces).

This is where Steve Jobs can make his point: life is much prettier when it's not open source. I would go ahead and make my own linters, but it would just conflict with every single other linter out there. The developer community needs to come together, and decide on a single standard to follow. Some people are just going to need to bite the bullet, sacrificing their coding standards for the greater good of the coding community. (I'm starting to sound a little Marxian over here).

This problem really only surfaces when working on a team. I've been working on a group [project](/projects/2016/03/tufts-dining-api), and I find myself styling my group member's code for my own benefit. Luckily, (or unluckily), no one else in my group styles their code (we'd have a real problem if they were using Standard; I don't). So, being the perfectionist that I am, I go ahead and style it how I like. But the problem simply reappears whenever anyone makes a push. That's why continuous integration tools need to be introduced to a team, and early. Everything on the master branch should be perfect. 

Finally, the use of web development tools. This is where Jekyll comes in. Jekyll is designed for *static* websites. The Jekyll sites that I've seen do not stray very far from the original template, a single home page and a list of posts, sorted by date. Building a search feature on top of Jekyll requires a lot of hacky code, which can be rewarding, but is undeniably just really ugly. To implement search, we needed to do it client-side, rendering everything with JavaScript. This kind of defeats the purpose of Jekyll altogether, and also very clearly breaks the rules of the MVC model. Rendering in JavaScript is not cool, and it bothers me.

This is my issue with Bootstrap right now. I understand CSS and I am able to do styling with CSS alone, but even just adding a single Bootstrap component improves the style considerably. And thats the issue. I don't feel that my team should be allowed to use Bootstrap halfway. It's all or nothing. If we go halfway, the result is a mediocre, unprofessional looking website. The moral of the story is to never half-ass a framework. If you're going to use it, *learn* it, and then make sure that's what you want to use. And NEVER use HTML to style things. Please.

So to all you out there who will be on development teams with me in the future, you have been warned. Start making your code pretty. Thanks.
