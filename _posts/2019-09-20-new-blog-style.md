---
layout: post
title: A New Blog Style
date: 2019-09-20 18:04:00
excerpt: I've rebuilt my blog's visual style again, this time on Tailwind CSS with some fun new tooling.
---

I've rebuilt my blog's visual style again, this time on [Tailwind CSS](https://tailwindcss.com) with some fun new tooling. I was able to re-use most of my HTML from the old templates, since there's not much to the theme, only swapping things like `mb-sm-3` for `sm:mb-3` on some of the Bootstrap utility classes, to change them to Tailwind ones. The new CSS stuff was fine, but the tooling around it was a bit more interesting.

This was my first time using PurgeCSS. I'm obsessive about keeping this blog loading as fast as possible, so making the new stylesheet tiny was part of my intent with this update. Tailwind gives a *big* stylesheet by default, [breaking 500 KB](https://unpkg.com/tailwindcss@&Hat;1.0/dist/tailwind.min.css) even when minified. Using PurgeCSS I was able to get this down to about 9 KB minified. Using it with Jekyll works really well since Jekyll generates final HTML for every page on the site, making PurgeCSS's selector matching quite painless. If you want to see the full setup (fairly simple), check out the [webpack.mix.js](https://github.com/Alanaktion/alanaktion.github.io/blob/master/webpack.mix.js) for this project that uses Laravel Mix with PostCSS.

I also set up [Puppeteer](https://github.com/GoogleChrome/puppeteer) with a [simple script](https://github.com/Alanaktion/alanaktion.github.io/blob/master/_pdf/resume.js) to generate a PDF of my Resume, since I haven't had an up-to-date PDF for it in years. I've used Puppeteer in the past when building the StructHub print export feature and found it to be an excellent way to generate complex PDFs, with some annoying limitations since you're still working in the context of a web page. Particularly for StructHub, a table of contents would have been amazing, but wasn't really possible to generate in a reasonable way since page numbers in the final print view aren't known until after the PDF is generated. We could have tried to render things out in JS with page-sized containers, but that could have led to all sorts of hard-to-fix bugs with weird content sizing inconsistencies. This new PDF is much simpler than that.

For a long time on this site, I refused to include any client-side JavaScript. Recently though, I set up a locally-hosted copy of [instant.page](https://instant.page), which is a JavaScript module that prefetches pages when there is an interaction with a link to them (either via hover or touchstart). I never intend to add JS to this site that has any effect on usability, or any user tracking, but this tiny module works great to make the website feel even faster than if it was a fully traditional, lightweight HTML site.

I also have no analytics on this site (and don't even really keep server logging), so I have no idea how many people, if any, read it, but it's still fun to work on as a side thing to experiment with new frontend technologies, new server configurations, and new design concepts. I'll likely continue to redesign it every year or two as I get bored with whatever it is at the time.

Maybe I'll even leave Jekyll. But probably not.
