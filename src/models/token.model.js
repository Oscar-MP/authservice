'use strict';
const { Utils } = require('../common/lib');

class Token {
  constructor(userid, secret) {
    this.secret = secret;
    this.userid = userid;

  }

  craft() {
    return `${this.secret}.${Utils.getRandomStr(8)}.${this.userid}`;
  }
}

module.exports = Token;
