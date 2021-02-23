'use strict'
const UserService = require('./user.service.js');
var utils = require('../common/utils.js');


class AuthService {

  constructor () {}

  async SignUp ( data ) {
    var user_data = await UserService.create(data);

    if (!user_data) {
      throw 'Failed to sign up';
    }

    return user_data;
  }

  async SignIn () {

  }

  async SignOut () {

  }
}

module.exports = new AuthService();
