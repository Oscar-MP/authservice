'use strict'

const mongoose  = require('mongoose');
const { hash, compareHash }  = require('../common/lib/crypto.js');
const { Logger } = require('../common/helpers/logger.js');
const { Utils } = require('../common/lib/index.js')
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

/**
  * USER ACTIVATION SCHEMA
  */

const activationSchema = new Schema({
  userid: {
    type: Schema.ObjectId,
    required: true,
    ref: 'User'
  },
  randomSeed: {
    type: String,
    required: true,
    default: function () {
      return Utils.getRandomStr(8);
    }
  },
  activated: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });


module.exports = {
  User: mongoose.model('User', userSchema),
  Activator: mongoose.model('Activator', activationSchema)
};
