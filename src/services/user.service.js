'use strict'

var Service   = require('./Service');
var mongoose  = require('mongoose');
const RoleService = require('./role.service');
const { User, Activator } = require('../models/user.model');
const { Utils } = require('../common/lib');
const { Logger, ErrorHandler } = require('../common/helpers');


const private_params = ['password', '__v', 'role'];

class UserService extends Service {

  constructor () {
    super(User);
  }

  async get (_id ) {
    let user = await super.get(_id);
    let role = await RoleService.get(user.role);
    user.role = role;
    return user;
  }

  async create ( data ) {

    if (!data.role) {
      // We should assign the lowest role, so we must find the role with permission level = 1;
      data.role = new mongoose.Types.ObjectId;
    }

    data.alias = data.alias || data.username;

    try {
      var response = await this.save(data);
      if (response)
        return Utils.removeFromObject(response, private_params, true);
    } catch (e) {
      throw ErrorHandler.stack(e, 'Could not create a new user');
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
      return Utils.removeFromObject(item, private_params); // The fucking ._doc should be fixed
    });

    return users;
  }

  async getById( _id, get_full_info = false) {
    // Fetchs a user by its ID

    try {
      var user = await this.get(_id);
    } catch (e) {
      throw ErrorHandler.stack(e, 'Could not fetch the user with the ID: ' + _id);
    }

    if (Utils.isEmpty(user)) {
      throw new ErrorHandler(404, `User with ID: ${_id} not found in the server!`);
    }

    return get_full_info ? user : Utils.removeFromObject(user, private_params);
  }

  async get_user ( identificator ) {
    // This function identifies and returns users. The identificator can be the _id, the email or the username
    const ObjectId = mongoose.Types.ObjectId;
    var res;

    try {
      if ( ObjectId.isValid(identificator) && !Utils.isEmpty((res = await this.getById(identificator))) ) return res[0];
      else if ( !Utils.isEmpty((res = await this.getBy('email', identificator))) ) return res[0];
      else if ( !Utils.isEmpty((res = await this.getBy('username', identificator)))) return res[0];
      else {
        throw new ErrorHandler(404, `User not found`);
      }

    } catch (err) {
      throw ErrorHandler.stack(err, 'Could not get the user with the identificator: ' + identificator);
    }

    return false;
  }

  async getByEmail (mail) {


    return this.schema.find({ email: mail }).exec();
  }

  async getByUsername (user) {
    return this.schema.find({ username: user }).exec();
  }

  async prepareActivationRecord ( userid ) {
    // Generates an activation record in the DB in order to prepare a link for the user activation process.

    var ActivatorService = new Service(Activator);

    try {
      var activationRecord = await ActivatorService.save({ userid: userid });

      if (!activationRecord) {
        throw new ErrorHandler(500, 'Error creating the activation process. Empty response.');
      }

      return activationRecord;

    } catch ( e ) {
      throw ErrorHandler.stack(e, 'Could not proceed with the activation proccess');
    }
  }

  async getActivationLink ( userid, options ) {
    // This function will return the link for the activation

    // First we will search if we already have the activation record
    var ActivatorService = new Service(Activator),
        record;

    if ( !(record = await ActivatorService.getBy('userid', userid)[0] )) {
      // If the record isn't already create we will create it.
      try {
        record = await this.prepareActivationRecord(userid);
      } catch ( e ) {
        throw e;
      }
    }

    // Now we craft the link
    return `http://localhost:7850/activate/${record.randomSeed}/${record.userid}/${record._id}`;

  }

  async activate_user (userId) {
    // Returns a bool
    try {
      var updated_user = await this.update(userId, { active: true });

      if (!updated_user) {
        throw new ErrorHandler(404, 'User not found!', { print: false });
      }

      return true;
    } catch (e) { throw e; }

    return false;
  }

}

module.exports = new UserService();
