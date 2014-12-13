'use strict';

var rss = require('./rss.js');
var mood = require('./mood.js');
var wget = require('./wget.js');
var clc = require('cli-color');

function logScore(score) {
  if (score < 0) {
    return clc.redBright(score);
  } else {
    return clc.greenBright(score);
  }
}

rss.on('newRssItem', function(item) {
  wget.fromUrl(item.link, function(text) {
    console.log(clc.bold(item.title));
    var moodScore = mood.getScore(text);
    console.log(clc.yellow('score: ') + logScore(moodScore.score));
    console.log(clc.blue('comparative: ') + logScore(moodScore.comparative) + '\n');
  });
});

rss.readRssUrl('https://news.google.com/?output=rss');
rss.readRssUrl('http://feeds.reuters.com/reuters/businessNews?format=xml');
