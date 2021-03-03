'use strict'

var model = require('../models/session.model.js');
var Service = require('./Service.js');

class Session extends Service {

  constructor (data, store_session = true ) {
    super(model);

    this.userid = data.userid;
    this.session_start = new Date();
    this.token = this.generate_token();
    this.client_info = {};

    if (store_session) {
      //this.create_session();
    }

    //console.log(this.get_all_my_sessions());

  }

  // Needed crud methods

  create_session () {
    // Stores the session into the DB
    try {
      // First we should look for an active session of this user.

      // Once there is no active session we start the new one
      this.save(this.get_session_class_data())
    } catch (e) {
      throw e;
    }
  }

  async get_all_my_sessions() {
    try {
      return await this.getBy('userid', this.userid);
    } catch (e) {
      throw e
    }
  }

  static async get_active_session () {
      // Returns a list of all active sessions
      try {
        var service = new Service(model);
        return await service.getBy('active', 'true');
      } catch ( e ) {
        throw e;
      }
  }

  generate_token () {
    return 'thisisanawesometoken';
  }

  get_public_info () {
    // Returns the public information about this session
    return {
      userid: this.userid,
      session_start: this.session_start,
      token: this.token
    };
  }

  add_history_route () {
    // Adds a new visited route during a session.

    // ! THIS WILL BE ALSO IN THE MODEL
  }

  set_client_information ( info ) {
      // ! THIS METHOD WILL BE IN THE MODEL
  }

  get_session_class_data () {
    // Returns the params of this class
    let object = {...this};

    delete object.schema;
    delete object.error;

    return object;
  }


  static get_client_ip ( request ) {
    // Get's the IP of the client. We need the request object
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  }
}

module.exports = Session;
