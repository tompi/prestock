'use strict';

var wget = require('../wget.js');

describe('wget', function() {
  it('should strip html tags', function() {
    var text = wget.fromString('<h1>Jalla julla</h1><b>Hei</b>');
    text.should.equal('JALLA JULLA\nHei');
  });
});
