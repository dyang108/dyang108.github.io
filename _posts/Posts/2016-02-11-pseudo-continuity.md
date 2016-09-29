---
layout: post
title: Real analysis vs CS
category: blog 
date: 2016-02-22
---

I'm in Real Analysis, a math class where we prove a lot of ideas that we take for granted about calculus in a rigorous way. Interestingly, I don't see that the course applies very much to computer science. Sure, math classes in general, and especially advanced math classes, help to improve my ability to solve problems and think through ideas on my own. However, in general, real analysis can basically be broken down into two ideas: things that are really big, and things that are really small.

The problem with this in computer science is that you can only go so small before you run out of memory. In all of the programming languages that I have experience with, there is a lower bound to the precision of numbers. In fact, all of the numbers that I use in these programming languages are, by the limitations of computer hardware, rational. Even π is terminated at some level of precision in code.

Now, there seem to be some cases where I am [wrong](http://recursed.blogspot.com/2011/04/can-irrational-numbers-be-represented.html). Wolfram Mathematica and Maple will use exact representation to bypass the precision issue, and there are ways to programmatically represent the decimal format of an irrational number, for example, the nth digit of √2 can be calculated recursively.

Nonetheless, in a computer as we know it, and using the set of real numbers that such a computer can adequately handle, certain mathematical concepts cannot hold true: the irrational numbers are not dense and limit points do not exist.

On the other end of the spectrum, we cannot hold an infinitely large set of things. For example, in a computer, the open set (0, 1) cannot be covered by the union of open sets (1/n, 1) for *n* in the natural numbers, since there is a limit to how high n can go. Interestingly, we can pick an *n* high enough such that we cover the computer's representation of the open set (0, 1).Conceptually, and in real life, this union does cover the set. But the computer's representation of the union does not cover, and cannot cover, our set.

So there are certain things one can prove with the help of a computer (see the [Four Color Theorem](https://en.wikipedia.org/wiki/Four_color_theorem)), but there are certain things that the computer cannot prove. Namely, anything that involves the really small or the really big.
