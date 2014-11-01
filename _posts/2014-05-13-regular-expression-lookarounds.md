---
layout: post
title: Regular Expression Lookarounds
date: 2014-05-13 04:12:09
---
Let's keep this simple.

* `(?=pattern)` positive lookahead
* `(?!pattern)` negative lookahead
* `(?<=pattern)` positive lookbehind
* `(?<!pattern)` negative lookbehind
    
Lookarounds can be nested, and lookbehinds can generally only be of a fixed length.

Where available, you can use lookarounds with `grep -P`. The `-o` flag will only output the match, instead of the full matching line.

That's all.