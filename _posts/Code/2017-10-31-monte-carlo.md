---
layout: post
title: Monte Carlo integration and the pitfalls of using a computer for math
category: code 
date: 2017-10-31
---

There's a gaping issue in the realm of mathematical modeling. It's one that many scientists are aware of. It's one of the primary complaints from scientists about MATLAB. Computers today are still unable to represent irrational numbers, and so the following code evaluates to true (logical 1) in MATLAB:

{% highlight javascript %}
1 + eps / 2 == 1
{% endhighlight %}

`eps` is the MATLAB [construct](https://www.mathworks.com/help/matlab/ref/eps.html) designed to determine when two numbers are "close enough". In many cases, this is important and useful (we don't want a really small error in measurement to mess up calculations). In others, it can cause failed simulations and rocket explosions.

The issue with `eps` is a pretty [well known one](https://www.mathworks.com/help/symbolic/recognize-and-avoid-roundoff-errors.html), and it is also ubiquitous across programming languages. I want to discuss another issue.

Some functions integrable by hand are not integrable with a computer. A computer will typically use Riemann integration for most functions. On the other hand, pathological functions like [Dirichlet's function](http://mathworld.wolfram.com/DirichletFunction.html) are not even Riemann integrable in the first place. However, using a Lebesgue integral, we can obtain a value of 1 for the integral (with the standard definition of Dirichlet's function, with irrationals -> 1, rationals -> 0). The Lebesgue integral from 0 to 1 for the function is 1.

If we somehow get over the challenge of even defining such a function in a computer, integrating it would be even more difficult. Since Dirichlet's is not Riemann integrable in the first place, we cannot apply the typical method of integration with a computer (based on Riemann integration). 

Now suppose we used [Monte Carlo integration](https://en.wikipedia.org/wiki/Monte_Carlo_integration) instead, choosing a large number of points within 0 <= x, y <= 1, to determine if we fall "under the curve". Without using a computer, we should theoretically expect the output value to give the correct value for the integral (1), since the probability of choosing a rational number between 0 and 1 in a uniform distribution is 0. Thus, pretty much every number we would choose would be irrational. This is because of the uncountability of the irrationals versus the countability of the rationals, as explained by the mathematician Georg Cantor. There are an order of infinity more irrationals than rational.

However, since every number representable in a computer is rational, the output of Monte Carlo integration for the Dirichlet function on a discrete valued machine (a computer) would be 0. This could not be further from correct, and yet the (hypothetical) scientists reading this result would take the computer's calculation as true.

It's probably a positive thing that the mere challenge of encoding Dirichlet's function into a computer is rather difficult (or impossible). There are probably some ways to code around the issue, but no way to represent all irrationals correctly in a computer.

So if there's one thing humans can do better than computers for the foreseeable future, it is theorizing about continuous functions and uncountable sets.
