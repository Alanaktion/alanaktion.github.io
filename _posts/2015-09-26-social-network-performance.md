---
layout: post
title: Social Network Performance pre
date: 2015-09-26 11:16:56
---

I've been working on a somewhat unique social network lately, and I wanted to see how it matched up with the big ones. Here's a simple breakdown of the HTTP requests on each site:

### Facebook
- 308 requests, 6.1 MB
- 36 CSS files, 232 KB
- 85 JS files, 1.7 MB
- 161 images, 507 KB
- 0 webfonts
- 2 IFRAMEs

### Twitter
- 65 requests, 2.7 MB
- 6 CSS files, 127 KB
- 4 JS files, 440 KB
- 45 images, 2.0 MB
- 1 webfont, 23.9 KB (Rosetta Icons)
- 1 IFRAME

### Google+
- 224 requests, 4.8 MB
- 13 CSS files, 79.9 KB
- 23 JS files, 1.4 MB
- 84 images, 1.7 MB
- 6 webfonts, 42.6 KB (Various weights of Roboto)
- 13 IFRAMEs

All of these were loaded from Chrome 45 on a desktop PC, with uBlock and Privacy Badger enabled (because really everyone should have both of these installed). Twitter is definitely the smallest, with a very fast perceived loading speed thanks to the small number of CSS files. All of the networks delay loading images until the rest of the interface is there. I was surprised to see Google+ using webfonts for their content, but since they were the same fonts used throughout many Google sites, chances are you already have Roboto cached from another previous pageload.

For comparison, here's my current test site's requests:

- 25 requests, 1.0 MB
- 1 CSS file, 21.7 KB
- 5 JS files, 53.9 KB
- 14 images, 577 KB
- 3 webfonts, 412 KB (very bad)

Apart from the webfonts, this loads very, very quickly. The webfont slowness was what prompted me to look into what other networks were doing, and it was good to see that other sites weren't requiring nearly as much data for their webfonts. In Webkit browsers, on a slow connection, webfonts this big can prevent the content from showing for a good 5-6 seconds, which is definitely not usable. The reason for the size of my fonts is that they include the full Unicode glyph set, which is great for consistency between many languages, but is just not worth the load time.

The only conclusion I can draw from this is that Twitter is the only company who knows what they're doing. Google+ has good cached load times, which is probably fine since most of their assets are cached from other Google pages anyway, but Facebook needing 1.7 MB of JavaScript is just scary.
