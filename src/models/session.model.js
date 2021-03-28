'use strict'

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
const { ErrorHandler } = require('../common/helpers');

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
  token_secret: {
    type: String
  },
  lang: {
    type: String,
    default: 'ES'
  },
  history: [ String ],
  expiration_date: {
    type: Date,
    default: function () {
      let addition_time = 1000 /* miliseconds */
                          * 60 /* seconds */
                          * 60 /* minutes */
                          * 24 /* hours */
                          * 7  /* days */;
      var now = new Date().getTime();

      return new Date(now + addition_time);
    }
  },
  last_join: {
    type: Date,
    default: Date.now
  }
});

schema.static.get_active_session = ( userid ) => {
  // Obtains the active session of a user
}


schema.pre('save', async function (next) {
    // Let's check if the user does exist

});


module.exports = mongoose.model('Session', schema);
