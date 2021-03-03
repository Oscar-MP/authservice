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
      Logger.error('Error creating a user', e);
      throw new ErrorHandler(500, 'Error creating a new user', e);
    }

    return false;
  }

  async get_users () {
    // Returns all users
    var users = await this.get_all();

    if (!users) {
      // Any user returned
    }

    // We should remove some params from the user data
    users = users.map((item) => {
      return utils.removeFromObject(item, private_params); // The fucking ._doc should be fixed
    });

    return users;
  }

  async getById( _id, get_full_info = false) {
    // Fetchs a user by its ID

    try {
      var user = this.get_doc(await this.get(_id));
    } catch (e) {
      console.log('[!] Error trying to fetch the user ' + _id, e);
      return false;
    }

    return get_full_info ? user : utils.removeFromObject(user, private_params);
  }

  async get_user ( identificator ) {
    // This function identifies and returns users. The identificator can be the _id, the email or the username

    var res;

    try {

      if ( !utils.isEmpty((res = await this.getByEmail(identificator))) ) return res[0];
      else if ( !utils.isEmpty((res = await this.getByUsername(identificator)))) return res[0];

    } catch (err) {
      console.log('ERROR: ',err);
    }
    return false;
  }

  async update () {

  }

  async delete() {

  }

  async getByEmail (mail) {
    return this.schema.find({ email: mail }).exec();
  }

  async getByUsername (user) {
    return this.schema.find({ username: user }).exec();
  }

  static async exists ( user ) {

  }
}

module.exports = new UserService();
