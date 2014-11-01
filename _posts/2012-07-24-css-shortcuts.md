---
layout: post
title: CSS Shortcuts
date: 2012-07-24 00:47:38
---
Learning CSS shortcuts can save time and keep your stylesheets cleaner and simpler.  There are several ways to write the same styles, some more efficient than others.  For example, padding can be declared for each side like this:
<pre>padding-top: 5px;
padding-right: 5px;
padding-bottom: 5px;
padding-left: 5px;</pre>
Or, you can condense each of the sides into a single line:
<pre>padding: 5px;</pre>
This works great if you want the padding to be equal on each side, but if that's not the case, you can follow this format:
<pre>padding: [top] [right] [bottom] [left];</pre>
Say we want the padding to be 5px on the top and bottom, and 3px on each side:
<pre>padding: 5px 3px 5px 3px;</pre>
This can still be further condensed, setting the top and bottom together, and both sides together, like this:
<pre>padding: [top/bottom] [sides];
padding: 5px 3px;</pre>
If you need to specify the top and bottom separately, but keep the sides the same, you can use this format:
<pre>padding: [top] [sides] [bottom];</pre>
This shortcut format works with border, padding, and margin.  The easiest way to remember this shortcut is that the list of units goes clockwise from the top.