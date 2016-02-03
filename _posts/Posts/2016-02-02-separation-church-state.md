---
layout: post
title: The Separation of Church and State
category: blog 
date: 2016-02-02
background: http://www.webcodecentral.com/wp-content/uploads/2013/05/html-sublimetext.jpg
---

Good web developers separate the three main parts of their page: HTML (Content), CSS (Stying), and JavaScript (Effects/server/whatnot). This page doesn't do that.

Okay. To be honest, I'm being lazy. Let me make a quick note of my rule violations, so that my web programming professor does not judge me for this. 

First off, trying to generate a search page for Jekyll requires some dynamic generation of content, and so I have JavaScript render it. There are extra templating tools, like [Underscore.js](http://www.underscorejs.org), that will render content on a template so that even the search page can be purely HTML. (I'll probably wanna do this later).

Secondly, I have not found a way in Jekyll templates to render a background image easily in pure CSS. So, in a sort of hacky way, I defined the background image in the HTML template, so that it is clean and easy for me to change the background whenever I want.

So, I broke the rules. I'm gonna try to un-break them sometime soon in the future, but as of now, I'm going to leave it as is. Thank you for your understanding.

Another thing: As of now, I have not defined the 'alt' attribute for all the images across this site, which is an issue.

Thanks to [MJ](https://github.com/maxjacobson), whose website is [here](http://www.hardscrabble.net/) for the help on this.