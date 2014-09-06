'use strict';

function Finder() {
  var emailRegexp = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

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
