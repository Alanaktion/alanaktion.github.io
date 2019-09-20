'use strict';

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const path = require('path').dirname(__dirname) + '/_site/resume/index.html';
  await page.goto('file://' + path, {waitUntil: 'load'});
  await page.addStyleTag({
    path: '../_site/public/css/theme.css'
  })
  await page.pdf({
    path: '../public/resume.pdf',
    format: 'letter'
  });

  await browser.close();
})();
