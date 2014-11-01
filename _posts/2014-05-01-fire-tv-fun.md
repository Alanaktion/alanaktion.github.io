---
layout: post
title: Fire TV Fun
date: 2014-05-01 06:45:46
---
**The Amazon Fire TV is an amazing device.**  The current app selection might be disappointing, but with a little effort you can get just about any Android app working beautifully on a Fire TV, and some apps designed for tablets feel like they were truly made to be on a TV.

**This is basically my guide to everything Fire TV.**

The first thing to note is that the Fire TV is compatible with most USB keyboard and mice, but only has a single USB port, so it's best to have a keyboard and mouse that use a single wireless dongle. The Logitech unifying ones work great for me.

### Keyboard/Mouse Usage

The mouse has a pretty simple function, acting as a pointer to use apps as if you had a touch screen, with the primary mouse button acting as a tap/drag. The scroll wheel also works well in most applications, and is particularly nice in web browsers.

The keyboard works pretty much as you'd expect, with a few important things to note:

* F12 acts as the Home button
* Tab is the same as the Play/Pause button on the remote
* Alt+Tab opens the Recent Apps overlay for quickly switching applications

Don't touch the volume keys. If you do, you might need to install a volume control app with ADB to get your sound back.

### Installing Apps

Unlike a Chromecast, Apple TV, or Roku, the Fire TV is left very open, with <abbr title="Android Debug Bridge">ADB</abbr> over the local network easily enabled from Settings.  ADB allows you to access the filesystem and install applications from APK packages, which can be extracted from other Android devices or found the app developer's website.

Install ADB and add it to your path, there are tons of guides for this, so I won't detail it here. Next, find your Fire TV's IP address in *Settings > System > About > Network*. You can then connect to your Fire TV by running the following commands:

* `adb connect <ip address>` Connects ADB to your Fire TV
* `adb install <apk filename>` Installs the specified application
* `adb shell` Opens an interactive shell on the Fire TV (Advanced users)

Applications installed through ADB won't be shown on the launcher, but are accessible through *Settings > Applications*.

These are the apps I've tried that work well:

* [Chrome Browser](https://play.google.com/store/apps/details?id=com.android.chrome)
* [Mozilla Firefox](https://play.google.com/store/apps/details?id=org.mozilla.firefox)
* [CPU-Z](https://play.google.com/store/apps/details?id=com.cpuid.cpu_z)
* [Microsoft Remote Desktop](https://play.google.com/store/apps/details?id=com.microsoft.rdc.android)
* [Imgur](https://play.google.com/store/apps/details?id=com.imgur.mobile)
* [SWSounds](https://play.google.com/store/apps/details?id=com.spriton.swsounds)
* [Dropbox](http://www.dropbox.com/android)
* [Bitbeaker](https://play.google.com/store/apps/details?id=com.saibotd.bitbeaker)

Awesome apps that work all right, but have some broken features:

* [Play Music](https://play.google.com/store/apps/details?id=com.google.android.music)
* *...I'll add more later as I test them*

I also tried installing the stock Play Store app, but it has a lot of other requirements that I wasn't willing to take the time to find. When launching the app without those requirements, it crashes, then causes the Fire TV to do a hard reboot. Not exactly usable. :P

### Screenshots

A photo of my Fire TV running [CPU-Z](https://play.google.com/store/apps/details?id=com.cpuid.cpu_z), showing some system specs:
![CPU-Z Photo](//phpizza.com/~alan/blog-img/2014_04_30_21_34_51s.jpg)

My personal favorite App on my Fire TV so far, [Microsoft Remote Desktop](https://play.google.com/store/apps/details?id=com.microsoft.rdc.android):
![Microsoft Remote Desktop](//phpizza.com/~alan/blog-img/2014_04_30_21_41_17s.jpg)
Amazingly, the keyboard works almost seamlessly on Remote Desktop, and as long as your LAN is fast enough, it works great for streaming media that isn't supported another way.

----

Once the Fire TV is a bit easier to root, I'll probably write a thorough guide on that, and the things you can do after rooting, because seriously these things are just awesome.

If I'm missing something or something is incorrect, please let me know, I'm [@alanaktion on Twitter](https://twitter.com/alanaktion).
