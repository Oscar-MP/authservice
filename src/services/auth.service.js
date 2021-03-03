'use strict'
const UserService = require('./user.service.js');
const Session = require('./session.service.js');
const utils = require('../common/utils.js');
const { ErrorHandler } = require('../common/helpers/error.js');
const { Logger } = require('../common/helpers/logger.js');


class AuthService {

  constructor () {}

  async SignUp ( data ) {
    var user_data = await UserService.create(data);

    if (!user_data) {
      throw new ErrorHandler(500, 'Could not create the user during the signup');
    }

    return user_data;
  }

  async SignIn (username, password) {
    // This method performs the login operation. If succeed, then the session information will be returned

    // The param user can be the username or the email

    try {
      var user = await UserService.get_user(username);
    } catch (err ) {
      throw err;
    }

    if (user.password !== password) {
      // The passwords doesn't match
      return false;
    }

    // The passwords are the same so we start a new session
    try {
      var session = new Session({ userid: user._id })
    } catch (e) {
      Logger.error('Could not create a session', e);
      throw new ErrorHanler(500, 'Could not create the session', e);
    }

    return session.get_public_info();
  }

  async SignOut () {

  }


}

module.exports = new AuthService();
