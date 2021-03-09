'use strict'

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  permissionLevel: {
    type: Number,
    default: 1,
    min: [1, 'The permission level can not be below 1'],
    max: [100, 'The permission level can not be above 100']
  },
  description: {
    type: String,
    default: 'Description of the role'
  }
});

module.exports = mongoose.model('Role', userSchema);
