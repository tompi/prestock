'use strict';

// Get url and return text
var EventEmitter = require('events').EventEmitter;
var request = require('request');
var htmlToText = require('html-to-text');

var me = new EventEmitter();

me.errorHandler = function(error) {
  me.emit('error', error);
};

me.fromString = function(string) {
  return htmlToText.fromString(string);
};

me.fromUrl = function(url, next) {
  request(url, function(error, response, body) {
    if (error || response.statusCode < 200 || response.statusCode > 299) {
      me.errorHandler(error);
    } else {
      next(me.fromString(body));
    }
  }); 
};

module.exports = me;
