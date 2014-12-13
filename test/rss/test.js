'use strict';

var rss = require('../../rss.js');
var fs = require('fs');

describe('RSS', function() {
  it('should get correct number of items from google rss', function(done) {
    var items = [];
    rss.on('newRssItem', function(item) {
      items.push(item);
    });
   
    var rssStream = fs.createReadStream(__dirname + '/google.xml');
    rss.readRssStream(rssStream, function() {
      items.length.should.equal(10);
      done();
    });
  });
  it('should not emit any events for already processed items', function(done) {
    var items = [];
    rss.on('newRssItem', function(item) {
      items.push(item);
    });
   
    var rssStream = fs.createReadStream(__dirname + '/google.xml');
    rss.readRssStream(rssStream, function() {
      items.length.should.equal(0);
      done();
    });
  });
    
});
