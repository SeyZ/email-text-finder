'use strict';

var async = require('async');
var cheerio = require('cheerio');

function Finder(opts) {
  var emailRegexp = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/;

  this.getEmails = function (text, callback) {
    async.waterfall([
      function (cb) {
        if (opts.sourceType === 'web') {
          var $ = cheerio.load(text);
          cb(null, $('body').text());
        } else {
          cb(null, text);
        }
      },
      function (text, cb) {
        var emails = [];

        var match = emailRegexp.exec(text);
        while (match !== null) {
          emails.push(match[0]);
          text = text.replace(new RegExp(match[0], 'gi'), '');
          match = emailRegexp.exec(text);
        }

        cb(null, emails);
      }
    ], callback);
  };
}

module.exports = Finder;
