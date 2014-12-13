'use strict';

var rss = require('./rss.js');

rss.on('newRssItem', function(item) {
  console.log(item);
});

rss.readRssUrl('https://news.google.com/?output=rss');
