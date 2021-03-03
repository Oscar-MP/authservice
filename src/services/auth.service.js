'use strict'
const UserService = require('./user.service.js');
const Session = require('./session.service.js');
var utils = require('../common/utils.js');


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
    const user = await UserService.get_user(username);

    if (user.password !== password) {
      // The passwords doesn't match
      return false;
    }

    // The passwords are the same so we start a new session
    try {
      var session = new Session({ userid: user._id })
    } catch (e) {
      console.log('[!] Could not create the session!', e);
      return false;
    }

    return session.get_public_info();
  }

  async SignOut () {

  }


}

module.exports = new AuthService();
