'use strict';

'use strict'

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

const schema = new Schema({

  userid: {
    type: Schema.ObjectId,
    required: [ true, 'A user ID must be provided for starting the session'],
    ref: 'User'
  },
  ip: {
    type: String
  },
  location: {
    lat: String,
    lon: String
  },
  resolution: String,
  browser: String,
  userAgent: String,
  lang: {
    type: String,
    default: 'ES'
  }
});

module.exports = mongoose.model('Device', schema);
