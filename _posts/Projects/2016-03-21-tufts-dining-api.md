---
layout: post
title: Tufts Dining API
category: projects
date: 2016-03-21
---

I built a Heroku-hosted RESTful API that tranformed menu information scraped from [Tufts Dining](http://menus.tufts.edu/foodpro/shortmenu.asp?sName=TUFTS+DINING&locationNum=09&locationName=Carmichael+Dining+Center&naFlag=1&WeeksMenus=This+Week%27s+Menus&myaction=read&dtdate=4%2F2%2F2016) into JSON. Using Flask and MongoDB, I built the site for fast and easy retrieval of Tufts menu data.

Mongo acts as a cache for dining data, storing all of the menus that have previously been accessed.

Why did I do this in the first place? For my web programming class, my group is building a dining hall comparison application. Given a certain point in time, I want to be able to retrieve the menu, look at all of the items in the menu, and compile a cumulative score for the dining hall. Furthermore, the theme of this semester's group projects is food, so I expect many groups to want to use the API instead of directly scraping the menu from the Tufts Dining website.

You can check out the code on [Github](https://github.com/dyang108/diningdata), or check out the [actual API](https://tuftsdiningdata.herokuapp.com/menus/carm/31/3/2016). Thanks to Serafeim Papastefanos for an awesome [tutorial](http://spapas.github.io/2014/06/30/rest-flask-mongodb-heroku/) on building a REST API on Heroku.

Status: Complete. I want to add scraping for nutrition information and ingredients, but this will prove to be more difficult, because the URL's for these pages are not obvious. We'll see what I can do. In the meantime, I'll be building [DiningDuel](/projects/2016/03/dining-duel).