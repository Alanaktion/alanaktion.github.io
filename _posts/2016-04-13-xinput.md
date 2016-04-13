---
layout: post
title: xinput
date: 2016-04-13 09:44:00
---

So I just discovered `xinput`. It's neat.

Say you want to reduce the sensitivity on your mouse because it's one of the stupid Mamba 2012s that are only usable with the buggy Windows software.

```bash
xinput list # lists input devices - note the ID of your device, we'll use '8'
xinput list-props 8
xinput 8 "Device Accel Constant Deceleration" 3
```
