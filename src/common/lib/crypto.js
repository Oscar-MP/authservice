'use strict'

const Crypto = require('bcrypt');

const hash = async (input) => {
  // This function will be used mainly for hashing passwords
  const salt_length = 10;

  try {
    return Crypto.hash(input, salt_length);
  } catch (e) {
    throw e;
  }
}

const compareHash = async (plainPassword, hash) => {
  return Crypto.compare(plainPassword, hash);
}

const md5 = (input) => {
  const md5sum = Crypto.createHash('md5');
  return md5sum.update(input).digest('hex');
}



module.exports = { hash, md5, compareHash };
