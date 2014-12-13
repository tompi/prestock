'use strict';

// Wrapper around feedparser
var FeedParser = require('feedparser');
var EventEmitter = require('events').EventEmitter;
var request = require('request');

// Inherit from eventemitter
var me = new EventEmitter();

// Also: remember url's parsed
me.urls = {};

me.errorHandler = function(error) {
  me.emit('error', error);
};

me.readRssStream = function(stream, next) {
  stream
    .pipe(new FeedParser())
    .on('error', me.errorHandler)
    .on('readable', function() {
      var item;
      while (item = this.read()) {
        // Only emit 1 event per url
        if (!me.urls[item.link]) {
          me.urls[item.link] = true;
          me.emit('newRssItem', item);
        }
      }
    })
    .on('drain', function() {
      if (next) next();
    });
};

me.readRssUrl = function(url, next) {
  var req = request(url)
    .on('error', me.errorHandler);
  me.readRssStream(req, next);
};

module.exports = me;
