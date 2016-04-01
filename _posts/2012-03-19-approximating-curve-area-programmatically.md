---
layout: post
title: Approximating the Area beneath a Curve Programmatically
date: 2012-03-19 12:06:59
---
Given any function in the slope-intercept form, whether linear or non-linear, the area between the curve and the x-axis between two points can be easily approximated with the Riemann Sum using a `For` loop.

This is a simple pseudo-code example, where `Y1` is the function and `Y1(I)` is the value of `Y1` at `X = I`:

```
N = 0
For (I, Left Limit, Right Limit, Step Interval)
    N = Y1(I) + N
End
Display N
```

To determine the step interval, use this:

```
Step Interval = (Right Limit - Left Limit) / Number of Steps
```

To improve accuracy, there are multiple ways of using this approximation, which distinguish between which end of each step to use.  To adjust the limits and intervals for the desired method, use this code:

```
If LRAM (using left end)
    Right Limit = Right Limit - Step Interval
End If
If MRAM (using middle of step, often most accurate)
    Left Limit = Left Limit + (Step Intverval / 2)
    Right Limit = Right Limit - (Step Intverval / 2)
End If
If RRAM (using right end)
    Left Limit = Left Limit + Step Interval
End If
```

For anyone wishing to have a complete program for a TI-83 or TI-84 calculator, use my [Riemann Sum Program](http://imalan.tk/files/2012/03/riemann.txt) (dead link).

Please note that this is an approximation. You can find exact answers using [integrals](http://en.wikipedia.org/wiki/Integral).
