---
layout: post
title: Connecting a Domain to a Subdirectory
date: 2012-08-25 23:53:57
tags: apache iis mod_rewrite web-hosting
---
<strong>Update</strong>: nginx is better. Shared hosting is terrible. <a href="https://www.digitalocean.com/?refcode=0ffb8d8a9dd9" target="_blank">Use DigitalOcean</a>. :)

If you want to host multiple websites on one hosting server, especially if it's a cheap shared server, knowing some basic URL rewriting is essential. This is how I'm running mine, on both my Apache and Microsoft IIS 7 servers.

The examples below direct (www.)domain2.com to /domain2/.
<h4>Apache</h4>
Within the file ".htaccess" in your server's root directory, include the following:
<pre> RewriteEngine On
 RewriteCond %{HTTP_HOST} ^(www.)?domain2.com$
 RewriteCond %{REQUEST_URI} !^/domain2/
 RewriteRule ^(.*)$ domain2/$1 [L]</pre>
<h4>Microsoft IIS 7</h4>
Within the file "web.config" in your server's root directory, include the following:
<pre>&lt;?xml version="1.0" encoding="utf-8" ?&gt;
&lt;configuration&gt;
    &lt;system.webServer&gt;
        &lt;rewrite&gt;
            &lt;rules&gt;
                &lt;rule name="prosecure.tk" enabled="true"&gt;
                    &lt;match url=".*" /&gt;
                    &lt;conditions&gt;
                        &lt;add input="{HTTP_HOST}" pattern="^(www.)?domain2.com" /&gt;
                        &lt;add input="{PATH_INFO}" pattern="^/domain2/" negate="true" /&gt;
                    &lt;/conditions&gt;
                    &lt;action type="Rewrite" url="domain2{R:0}" /&gt;
                &lt;/rule&gt;
            &lt;/rules&gt;
        &lt;/rewrite&gt;
        &lt;security&gt;
            &lt;requestFiltering allowDoubleEscaping="true" /&gt;
        &lt;/security&gt;
    &lt;/system.webServer&gt;
&lt;/configuration&gt;</pre>