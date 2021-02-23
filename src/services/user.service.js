'use strict'

var Service   = require('./Service.js');
var User      = require('../models/user.model.js');
var mongoose  = require('mongoose');
var utils = require('../common/utils.js');

const private_params = ['password', '__v', 'role'];

class UserService extends Service {

  constructor () {
    super(User);
  }

  async create ( data ) {

    if (!data.role) {
      data.role = new mongoose.Types.ObjectId;
    }

    data.alias = data.alias || data.username;

    try {
      var response = await this.save(data);
      if (response)
        return utils.removeFromObject(response, private_params, true);
    } catch (e) {
      throw e;
    }

    return false;


    /*var user = new User({
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

    return false;*/
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
