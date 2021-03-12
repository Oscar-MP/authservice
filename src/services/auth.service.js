'use strict'
const UserService = require('./user.service.js');
const Session = require('./session.service.js');
const utils = require('../common/utils.js');
const { ErrorHandler } = require('../common/helpers/error.js');
const { Logger } = require('../common/helpers/logger.js');


class AuthService {

  constructor () {}

  async SignUp ( data ) {

    // We must check first if the username or the email is already taken
    try {
      // Checking the username:
      if (!utils.isEmpty(await UserService.getByUsername(data.username)))
        throw new ErrorHandler(400, 'The username already exists', { errorName: 'BadRequest'});
      // Checking the email:
      if (!utils.isEmpty(await UserService.getByEmail(data.email)))
        throw new ErrorHandler(400, 'The email already exists', { errorName: 'BadRequest'});
    } catch (err) {
      throw ErrorHandler.stack(err, 'Error in signup service was cought');
    }

    // Now we proceed with the signup
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

    if (!await user.verifyPassword(password)) {
      // The passwords doesn't match
      return false;
    }

    // If the user is not activated we won't proceed with the session creation
    if (!user.activated)
      throw new ErrorHandler(401, 'You must first activate your account before being able to login!',  { errorName: 'Unauthorized', print: false });

    // The passwords are the same so we start a new session
    try {
      var session = new Session({ userid: user._id })
    } catch (e) {
      throw new ErrorHanler(500, 'Could not create the session', e);
    }

    return session.get_public_info();
  }

  async SignOut () {

  }


}

module.exports = new AuthService();
