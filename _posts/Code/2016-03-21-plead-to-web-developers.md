---
layout: post
title: Make things easier for computers who want to see your site
category: code
date: 2016-03-21
---

In building an [API](http://dyang108.github.io/projects/2016/03/tufts-dining-api) to hold Tufts dining menu data, there were certain things that I found more challenging than others. There are the things that you would expect to be difficult (things that I expected to be difficult, anyway), such as pushing my site to Heroku and learning and using MongoDB for the first time. On the other hand, there are other things that I would expect to be easier, including parsing retrieved HTML and formatting it. You know, because HTML data is supposed to be structured, and can basically be turned into JSON on the spot.

Nope. I don't know where Tufts Dining gets its menu template from, but I will say that it is incredibly hard to read, and to parse. Though the menu appeared hierarchical, the HTML represented it as a table, meaning that every heading and menu item seemed to have the same level of significance, at least in the HTML. Most of the styles were embedded into the HTML, a major no-no in the world of web programming. 

Another feature of Tufts dining menus is that the URL's associated with a specific menu are extremely long. I understand that they need some query string parameters in order to display the menu, but even when using query parameters, the beauty of a URL is definitely something to think about. When accessing the ingredients and nutrition page for a specific menu item, the URL does not even display the food in question.

The best that I can hope for, now that I have a working version of the API, is that no one further convolutes the menu pages.

So I have a plead to web developers everywhere: keep the URLs short and sweet, and write HTML that is hierarchical and easy to follow. When some college student wants to build an API out of the data on your page, they will thank you. 
