'use strict'

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

const schema = new Schema({

  userid: {
    type: Schema.ObjectId,
    required: [ true, 'A user ID must be provided for starting the session'],
    ref: 'User'
  },
  session_start: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  },
  token: {
    type: String,
    required: [ true, 'A token must be provided']
  },
  client_info: {
    ip: String,
    resolution: String,
    browser: [String],
  },
  lang: {
    type: String,
    default: 'ES'
  },
  history: [String],
  expiration_date: Date
});

schema.static.get_active_session = ( userid ) => {
  // Obtains the active session of a user
}
module.exports = mongoose.model('Session', schema);
