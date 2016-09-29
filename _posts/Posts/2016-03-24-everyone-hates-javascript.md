---
layout: post
title: Oh, Javascript
category: blog 
date: 2016-03-24
---

"JavaScript is a misunderstood language. You really need to get to know it before hating on it." -- some web programmer in denial

Okay, so maybe I'll eat my words someday, but I think this pretty much sums it up:

![two javascript books](https://qph.is.quoracdn.net/main-qimg-eb6eb210fd4116ef10fee083428ed482?convert_to_webp=true)

I think it's pretty much universally agreed upon that JavaScript's bad parts far outweigh the good parts.

I've most recently struggled with asynchronous callbacks within nested loops:

```js
for (foodType in menu) {
    for (foodname in foodType) {
        checkForFood(foodname, function(food) {
            foodArr.push(food);
        });
    }
}
return foodArr;
```
<br>
JShint gives a warning on the callback within a loop, and for good reason. The functions start piling on top of each other as the loop continues, not executing synchronously, which means that foodArr will still be empty on return. I wasn't able to figure out a solution without using an external library. Instead, I needed to use the **async** library and a whole bunch of extra callbacks just to make this thing run synchronously. 

```js
var async = require('async');
async.forEachOf(menu, function(typearr, type, callback1) {
    type = type.trim();
    async.each(typearr, function(foodname, callback2) {
        checkForFood(type, foodname, function(food) {
            foodArr.push(food);
            callback2();
        });
    }, function(err) {        
        callback1();
    });
}, function(err) {
    callback(foodArr);
});
```
<br>
So maybe this isn't actually a complaint about JavaScript, but rather the whole idea of asynchronous languages. I suppose I'm more used to synchronous languages, so it may not be fair for me to judge JavaScript for it. However, even the most seasoned of programmers still have trouble dealing with the issue of so-called ["callback hell"](http://callbackhell.com/) in JavaScript. That final pyramid of a bajillion of these: `});` will make anyone cringe.

Nonetheless, I'm grudgingly working on my JavaScript skills. And someday, I'll be that stubborn programmer with years of experience, blinded from the bad side of JavaScript, telling everyone else that JavaScript is so misunderstood.
