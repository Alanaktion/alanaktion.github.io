const mix = require('laravel-mix');

let postcssOptions = [
  require('postcss-easy-import'),
  require('tailwindcss'),
  require('autoprefixer'),
];

if (mix.inProduction()) {
  postcssOptions.push(require('@fullhuman/postcss-purgecss')({
    content: ['./**/*.html'],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
  }));
}

mix.postCss('_css/theme.css', 'public/css/', postcssOptions);
