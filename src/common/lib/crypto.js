'use strict'

const Crypto = require('crypto');

const hash = (input, salt) => {

}

const md5 = (input) => {
  const md5sum = Crypto.createHash('md5');
  return md5sum.update(input).digest('hex');
}



module.exports = { hash, md5 };
