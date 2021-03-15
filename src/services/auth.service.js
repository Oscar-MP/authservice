'use strict'
const UserService = require('./user.service.js');
const Session = require('./session.service.js');
const Service   = require('./Service.js');
const { Utils } = require('../common/lib');
const { ErrorHandler, Logger } = require('../common/helpers');
const { Activator } = require('../models/user.model.js');

class AuthService {

  constructor () {}

  async SignUp ( data ) {

    // We must check first if the username or the email is already taken
    try {
      // Checking the username:
      if (!Utils.isEmpty(await UserService.getByUsername(data.username)))
        throw new ErrorHandler(400, 'The username already exists');
      // Checking the email:
      if (!Utils.isEmpty(await UserService.getByEmail(data.email)))
        throw new ErrorHandler(400, 'The email already exists');
    } catch (err) {
      throw ErrorHandler.stack(err, 'Error in signup service was cought');
    }

    // Now we proceed with the signup
    var user_data = await UserService.create(data);

    if (!user_data) {
      throw new ErrorHandler(500, 'Could not create the user during the signup');
    }

    // We already created the user, now we have to generate the activation link
    try {
      var link = await UserService.getActivationLink(user_data._id);
    } catch (e) {
      throw e;
    }
    return {
      user_data: user_data,
      activation_link: link
    };
  }

  async SignIn (username, password) {
    // This method performs the login operation. If succeed, then the session information will be returned

    // The param user can be the username or the email

    try {
      var user = await UserService.get_user(username);
    } catch (err ) {
      throw ErrorHandler.stack(err, 'Can not sign in with user: ' + username);
    }

    if (!await user.verifyPassword(password)) {
      // The passwords doesn't match
      throw new ErrorHandler(401, 'Could not login. Wrong username or password!', { print: false});
    }

    // If the user is not activated we won't proceed with the session creation
    if (!user.active)
      throw new ErrorHandler(403, 'You must first activate your account before being able to login!',  {  print: false });

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

  async activateAccount (activation_id, user_id) {
    var ActivatorService = new Service(Activator);

    try {
      var activationRecord = await ActivatorService.get(activation_id);

      if (!activationRecord) {
        throw new ErrorHandler(404, 'Activation request not found', { print: false });
      }

      if ( activationRecord.userid != user_id ) {
        throw new ErrorHandler(400, 'Activation request missmatch', { print: false });
      }

      if ( !await UserService.activate_user(user_id)) {
        throw new ErrorHandler(500, 'Could not activate the user. Unknown reason');
      }
    } catch ( e ) { throw e; }

    // The user has been successfully activated! Now we will update the activationRecord in order to set
    // the activated para to true.

    try {
      var activated = await ActivatorService.update(activation_id, { activated: true });

      if ( !activated ) {
        throw new ErrorHandler(404, 'Activation record not found!')
      }

      return true;

    } catch ( e ) {
      throw ErrorHandler.stack(e, 'Could not set the activationRecord activated flag to true');
    }

  }

}

module.exports = new AuthService();
