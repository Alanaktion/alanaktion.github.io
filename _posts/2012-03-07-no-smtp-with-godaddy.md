---
layout: post
title: No SMTP with GoDaddy
date: 2012-03-07 18:10:06
---
As the first letter in the acronym SMTP stands for *simple*, that's what I was expecting when I decided to use the Google Apps SMTP server to send out notifications for Xusix. In the end, after three days of repeatedly rewriting the mailer functions, I discovered the reason nothing was sending.  GoDaddy shared hosting doesn't allow SMTP connections. At all. They simply block anything that appears to be sent through that protocol, or uses a common SMTP port, leaving me to the only remaining option: using GoDaddy's own mailer. The problem with this is that their spam filter is so aggressive, few messages ever make it through. And so, notifications on Xusix, although programmatically work, will likely never reach an inbox.
