'use strict';

var mood = require('../mood.js');

describe('mood', function() {
  it('should determine crappy mood', function() {
    var score = mood.getScore('I hate cats. Especially stupid ones.').score;
    score.should.equal(-5);
  });
});
