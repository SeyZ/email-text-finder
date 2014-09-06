'use strict';

function Finder() {
  var emailRegexp = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/;

  this.getEmails = function (text, callback) {
    var emails = [];

    var match = emailRegexp.exec(text);
    while (match !== null) {
      emails.push(match[0]);
      text = text.replace(new RegExp(match[0], 'gi'), '');
      match = emailRegexp.exec(text);
    }

    callback(null, emails);
  };
}

module.exports = new Finder();
