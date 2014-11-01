---
layout: post
title: Approximating the Area beneath a Curve Programmatically
date: 2012-03-19 12:06:59
---
Given any function in the slope-intercept form, whether linear or non-linear, the area between the curve and the x-axis between two points can be easily approximated with the Riemann Sum using a <code>For</code> loop.

This is a simple pseudo-code example, where <code>Y1</code> is the function and <code>Y1(I)</code> is the value of <code>Y1</code> at <code>X = I</code>:
<pre>N = 0
For (I, Left Limit, Right Limit, Step Interval)
    N = Y1(I) + N
End
Display N</pre>
To determine the step interval, use this:
<pre>Step Interval = (Right Limit - Left Limit) / Number of Steps</pre>
To improve accuracy, there are multiple ways of using this approximation, which distinguish between which end of each step to use.  To adjust the limits and intervals for the desired method, use this code:
<pre>If LRAM (using left end)
    Right Limit = Right Limit - Step Interval
End If
If MRAM (using middle of step, often most accurate)
    Left Limit = Left Limit + (Step Intverval / 2)
    Right Limit = Right Limit - (Step Intverval / 2)
End If
If RRAM (using right end)
    Left Limit = Left Limit + Step Interval
End If</pre>
For anyone wishing to have a complete program for a TI-83 or TI-84 calculator, use my <a href="http://imalan.tk/files/2012/03/riemann.txt">Riemann Sum Program</a>.

Please note that this is an approximation. You can find exact answers using <a title="Integrals on Wikipedia" href="http://en.wikipedia.org/wiki/Integral" target="_blank">integrals</a>.