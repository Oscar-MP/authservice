'use strict';
/**
  * This file will be changed with the JWT implementation
  */

const { Utils } = require('../common/lib');
const { ErrorHandler } = require('../common/helpers');

const jwt    = require('jsonwebtoken');
const Config = require('../../config/config.js');
var ObjectId = require('mongoose').Types.ObjectId;

class Token {
  constructor( payload, secret, token_secret ) {

    if (!payload.userId || !payload.username ) {
      throw new ErrorHandler(500, `Missing token information`);
      return;
    }
    if ( secret === true ) {
      this.secret   = token_secret || Utils.getRandomStr(12);
    }

    this.userId     = payload.userId;
    this.sessionId  = payload.sessionId || ObjectId();
    this.seed       = Utils.getRandomStr(8);
    this.username   = payload.username;
  }

  encode() {
    // Encodes the token into a jwt signed token.

    let payload = {
      userId: this.userId,
      sessionId: this.sessionId,
      username: this.username,
      seed: this.seed
    };

    try {
      if (!this.secret) throw new ErrorHandler(500, `No token secret specified`);

      return jwt.sign( payload, this.secret, {
        expiresIn: Config.getConfig().token_ttl
      });
    } catch ( error ) {
      throw ErrorHandler.stack(error, 'Could not encode the token')
    }
  }

  static decode( token_string ) {
    // Decodes the token payload and returns a token object with it
  }

  static verify ( token_string, secret ) {
    // Verifies the token signature and if the token is alive. Returns a bool?

  }

  static isValid ( token ) {
    // Checks if the token is well crafted. This method does not verify the token signature.
    // Return a bool
  }

  static isAlive( token ) {

  }
}

module.exports = Token;
