'use strict';

// Get AFINN score for text
var sentiment = require('sentiment');

var me = {};

me.getScore = function(text) {
  return sentiment(text);
};

module.exports = me;
