'use strict';
/**
  * This file will be changed with the JWT implementation
  */

const { Utils } = require('../common/lib');

class Token {
  constructor(secret, payload) {
    this.secret     = secret;
    this.userid     = payload.userid;
    this.sessionid  = payload.sessionId;

  }

  craft() {
    return `${this.sessionid}.${Utils.getRandomStr(8)}.${this.userid}`;
  }
}

module.exports = Token;
