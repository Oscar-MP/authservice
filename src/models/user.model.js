'use strict'

const mongoose  = require('mongoose');
const { hash, compareHash }  = require('../common/lib/crypto.js');
const { Logger } = require('../common/helpers/logger.js');
const Schema    = mongoose.Schema;

const userSchema = new Schema({
  alias: String,
  username: String,
  email: String,
  password: String,
  role: { type: Schema.ObjectId, ref: 'Role'},
  active: {
    type: Boolean,
    default: false
  }
});

userSchema.pre('save', async function (next) {
    // This function will be executed before creating or updating a user.
    // It's important to hash the password in this function

    try {
      if ( this.isModified('password') || this.isNew) {
        try {
          this.password = await hash(this.password);
        } catch (e) {
          throw e;
        }
      } else {
        return next();
      }
    } catch (e) {
      Logger.error('Problem saving the user!', e);
      next(e);
    }
});

userSchema.methods.verifyPassword = async function ( input_password ) {
  return await compareHash(input_password, this.password);
}

module.exports = mongoose.model('User', userSchema);
