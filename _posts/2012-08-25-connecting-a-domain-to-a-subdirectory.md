---
layout: post
title: Connecting a Domain to a Subdirectory
date: 2012-08-25 23:53:57
tags: apache iis mod_rewrite web-hosting
---
**Update**: nginx is better. Shared hosting is terrible. [Use DigitalOcean](https://www.digitalocean.com/?refcode=0ffb8d8a9dd9). :)

If you want to host multiple websites on one hosting server, especially if it's a cheap shared server, knowing some basic URL rewriting is essential. This is how I'm running mine, on both my Apache and Microsoft IIS 7 servers.

The examples below direct `(www.)domain2.com` to `/domain2/`.

### Apache
Within the file `.htaccess` in your server's root directory, include the following:

```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} ^(www.)?domain2.com$
RewriteCond %{REQUEST_URI} !^/domain2/
RewriteRule ^(.*)$ domain2/$1 [L]
```

### Microsoft IIS 7
Within the file `web.config` in your server's root directory, include the following:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="prosecure.tk" enabled="true">
                    <match url=".*" />
                    <conditions>
                        <add input="{HTTP_HOST}" pattern="^(www.)?domain2.com" />
                        <add input="{PATH_INFO}" pattern="^/domain2/" negate="true" />
                    </conditions>
                    <action type="Rewrite" url="domain2{R:0}" />
                </rule>
            </rules>
        </rewrite>
        <security>
            <requestFiltering allowDoubleEscaping="true" />
        </security>
    </system.webServer>
</configuration>
```
