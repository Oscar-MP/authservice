'use strict'

const model     = require('../models/session.model.js');
const Service   = require('./Service.js');
const Token     = require('../models/token.model.js');
const { Utils } = require('../common/lib');
const { ErrorHandler } = require('../common/helpers');

class SessionService extends Service {

  constructor () {
    super(model);
  }

  async generate_session ( { userid } ) {
    // Creates a new session for a user. Returns a session cookie and a token
    try {
      // Firstly we should create the token
      let token_secret = Utils.getRandomStr(8);
      let token = new Token(userid, token_secret);
      // Token options

      // Get the token string
      let raw_token       = token.craft();
      var session = await this.isAlreadyInSession(userid);

      if ( !session ) {
        session  = await this.save({
          userid: userid,
          token: raw_token,
          token_secret: token_secret
        });
      }

      return { raw_token, session_cookie: {
          cookie_id: session._id,
          lang: session.lang
      }};

    } catch ( err ) {

      throw ErrorHandler.stack(err, 'Could not generate the session',);
    }

  }




  async isAlreadyInSession ( userid ) {
    // Checks if there is already a session for a user
    // If there is more than one active session then all sessions are disabled unless the last created session
    let sessions = await this.schema.find({ userid: userid });
    let active_sessions = sessions.filter( s => s.active );

    if (active_sessions.length > 0 ) {
      // The user is already in another session, let's check if
      // there is more than one session
      var scope = this;
      active_sessions.forEach( async   ( e, index ) => {
        // El último elemento del array lo dejamos intacto ya que es el que se devolverá.
        if ( index != active_sessions.length - 1 || !scope.isAlive(e) ) {
          e.active = false;

          try {
            let updated_e = await scope.schema.findByIdAndUpdate(e._id, e);

          } catch ( err ) {
            throw ErrorHandler.stack(err, 'Could not update the session ' + e._id);
          }
        }
      });

      if (active_sessions.length > 1) {
        // wtf
      }

      return active_sessions[0];
    }

    return false;
  }

  async isAlive ( session ) {
    // Checks if the session is still valid in terms of time
    return Date.now < session.expiration_date;
  }

  async get_all_my_sessions() {
    try {
      return await this.getBy('userid', this.userid);
    } catch (e) {
      throw ErrorHandler.stack(e, 'Could not list the sessions related with the user: ' + this.userid);
    }
  }

  async get_active_session () {
      // Returns a list of all active sessions
      try {
        var service = new Service(model);
        return await service.getBy('active', 'true');
      } catch ( e ) {
        throw ErrorHandler.stack(e, 'Could not list the active sessions');
      }
  }

  static get_client_ip ( request ) {
    // Get's the IP of the client. We need the request object
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  }

}

module.exports = new SessionService();
