'use strict'

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

const userSchema = new Schema({
  alias: String,
  username: String,
  email: String,
  password: String,
  role: { type: Schema.ObjectId, ref: 'Role'}
});

module.exports = mongoose.model('User', userSchema);
