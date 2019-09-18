const mix = require('laravel-mix');

mix.postCss('_css/theme.css', 'public/css/', [
    require('postcss-easy-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('@fullhuman/postcss-purgecss')({
      content: ['./**/*.html'],
    }),
  ]);
