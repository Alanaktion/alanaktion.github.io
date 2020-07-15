# Phpizza Blog

[![github randos](https://randos.online/u/Alanaktion?theme=green)](https://randos.online/u/Alanaktion/next)

This is my new blog built on [Jekyll](http://jekyllrb.com). I like it.

It uses a custom theme built on [Tailwind CSS](https://tailwindcss.com), and includes a local copy of [instant.page](https://instant.page) to make page transitions feel even snappier. It also includes a [Puppeteer](https://github.com/GoogleChrome/puppeteer) setup for generating a PDF of the Resume page.

## Using

Feel free to use the tooling and theme that I've set up for your own blog or site, just make sure not to publish my content by accident!

## Compiling CSS

I'm using [Laravel Mix](https://laravel-mix.com) to build the CSS, and committing the compiled, minified file. It also uses purgecss when running a production build to keep the final CSS as tiny as possible.

### Development

This works best with two shells:

```bash
jekyll serve
```

```bash
npm i
npm run watch
```

### Production/commits

Before committing, a final build and production npm build are required to generate the minified file with unused selectors stripped.

```bash
jekyll build
npm ci
npm run prod
```

## Building Resume PDF

A script is included to generate a PDF of the Resume page. So far it's only been run on macOS so we're getting those fonts in the output 😋

```bash
cd pdf
npm ci
npm run pdf
```
