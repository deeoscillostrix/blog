/**
 * Feel free to utilize this file to create your draft posts for your Jekyll site if you like!
 * This JS file runs in Node to automatically create a new draft post for a given time frame automatically.
 *
 * An alternative to this is by using Jekyll Compose: https://github.com/jekyll/jekyll-compose
 */

const fs = require('fs');
const prompt = require('prompt-sync')({ sigint: true });
/**
 * If you run into errors with creating prompt, run the following in the terminal:
 * npm i prompt-sync
 */

const CURRENT_DATE_OBJECT = new Date();

// get YYYY-MM-DD
const CURRENT_DATE = `${CURRENT_DATE_OBJECT.getFullYear()}-${String(
  CURRENT_DATE_OBJECT.getMonth() + 1
).padStart(2, '0')}-${String(CURRENT_DATE_OBJECT.getDate()).padStart(2, '0')}`;

// get HH:mm:ss
const CURRENT_TIME = `${String(CURRENT_DATE_OBJECT.getHours()).padStart(
  2,
  '0'
)}:${String(CURRENT_DATE_OBJECT.getMinutes()).padStart(2, '0')}:${String(
  CURRENT_DATE_OBJECT.getSeconds()
).padStart(2, '0')}`;

/**
 * Key for TimeZone offset:
 * -480 means UTC +0800
 * 60 means UTC -0100
 */
const TIMEZONE_OFFSET = CURRENT_DATE_OBJECT.getTimezoneOffset();
const CURRENT_TIMEZONE = `${TIMEZONE_OFFSET < 0 ? '+' : '-'}${String(
  Math.abs(TIMEZONE_OFFSET) / 60
).padStart(2, '0')}${String(Math.abs(TIMEZONE_OFFSET) % 60).padStart(2, '0')}`;

// let title, file_title;
// do {
//   title = prompt('Enter post title >> ');
//   file_title = String(title).toLowerCase().replace(' ', '-');
// } while (title === '' || title === null);

let title = prompt(
  'Enter post title (keep empty to make post draft template) >> '
);
title = title === '' || title === null ? 'new-post' : title;
let file_title = String(title).toLowerCase().replace(' ', '-');
while (file_title.indexOf(' ') > -1)
  file_title = String(title).toLowerCase().replace(' ', '-');

const FRONT_MATTER = `---
title: ${title}
author: oscillo
date: ${CURRENT_DATE} ${CURRENT_TIME} ${CURRENT_TIMEZONE}
categories: []
tags: []
# comments: false
# math: true
---`;

const FILENAME = `${CURRENT_DATE}-${file_title}.md`;
const DATESTAMP = `${CURRENT_DATE} ${CURRENT_TIME} ${CURRENT_TIMEZONE}`;

fs.writeFile(`_drafts/${FILENAME}`, FRONT_MATTER, function (err) {
  if (err) throw err;
  console.log(
    `Created new post draft: ${DATESTAMP}
			under name: ${FILENAME}`
  );
});
