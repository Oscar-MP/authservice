'use strict'
var User = require('../models/user.model.js');
var mongoose = require('mongoose')
class UserService {

  constructor () {}

  async create ( data ) {

    var user = new User({
      _id: new mongoose.Types.ObjectId,
      username: data.username,
      alias: data.alias || data.username,
      email: data.email,
      password: data.password,
      role: new mongoose.Types.ObjectId
    });

    try {
      const saved_data = await user.save();

      if (saved_data) {
        return saved_data._doc; // Esto hay que cambiarlo
      }
    } catch (e) {
      console.log('[!] Error: \n', e._message);
    }

    return false;
  }

  async get () {

  }

  async update () {

  }

  async delete() {

  }


  static async exists ( user ) {

  }
}

module.exports = new UserService();
