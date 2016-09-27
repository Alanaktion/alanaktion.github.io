---
layout: post
title: Pidgin with Google Apps
date: 2015-09-10 13:20:55
---

I love using Pidgin with our chat server at work. It's a really nice, clean IM client (apart from the account management, that's a mess). Setting it up with Google Apps is slightly more tricky.

1. If you use 2-Factor Authentication (never a bad idea), you'll need to [generate an app password](https://security.google.com/settings/security/apppasswords) before you can use the account with Pidgin or other generic mail/chat clients.
2. Pick Other for the app name, and name it "Pidgin" or whatever else you want. Copy the password it generates for you.

In Pidgin's Buddy List window, go to Accounts > Manage Accounts (<kbd>Ctrl+A</kbd>), click Add..., and enter the following details in the Basic tab:

* Username: the prefix of your email address (e.g. "alan" from "alan@phpizza.com")
* Domain: the domain name of your email address (e.g. "phpizza.com")
* Password: your account password, unless you have 2-factor authentication, then it's the app password generated in the first step.

In the Advanced tab, set "Connect server" to `talk.google.com`.

That's it! You should be able to use Pidgin with your Google Apps account now.
