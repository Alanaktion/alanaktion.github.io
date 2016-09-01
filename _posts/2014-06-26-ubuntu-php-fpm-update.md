---
layout: post
title: Ubuntu PHP FPM Update
date: 2014-06-26 23:49:20
excerpt: The latest PHP-FPM update on Ubuntu 14.04 changes the default UNIX socket permissions for some reason.
---
The latest package update for php-fpm on Ubuntu is a bit messy to install if you're listening on a unix socket. The service will restart and change the permissions on the socket to only be accessible to root, which means unless you're running your webserver as root (please don't), it won't be able to run any PHP.

You can manually change ownership or permissions to give your web server user read/write access, but when the service restarts, it will fail again. The best way to fix the issue is to uncomment these lines in your pool.d file (changing owner, group, and permissions when necessary):

```ini
listen.owner = www-data
listen.group = www-data
listen.mode = 0666
```
