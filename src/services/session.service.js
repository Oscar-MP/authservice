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

  async generate_session ( { userid, username, role } ) {
    // Creates a new session for a user. Returns a session cookie and a token
    try {
      // We're firstly closing any existing user session
      await this.closeUserSession( userid );

      // Then we create the token for the new session

      var token = new Token({ userId: userid, username: username}, true);
      var encoded_token = token.encode();

      const session = await this.save({
        _id: token.sessionId,
        userid: userid,
        token: encoded_token,
        secret: token.secret
      })

      return {
        token: encoded_token,
        session_cookie: {
          lang: session.lang
        }
      };

    } catch ( err ) {

      throw ErrorHandler.stack(err, 'Could not generate the session',);
    }

  }

  async closeUserSession( userId ) {
    // Finishes the user session. This means that we will disable all existing sessions of
    // a given user but it's supposed to be just one session active at once.

    try {
      var session = await this.isAlreadyInSession(userId);

      if (session) {
        session.active = false;

        let updated = await this.schema.findByIdAndUpdate(session._id, session);
      }
    } catch (err) {
      throw ErrorHandler.stack(err, 'Could not close user session');
    }

    return;
  }

  async isAlreadyInSession ( userid ) {
    // Checks if there is already a session for a user
    // If there is more than one active session then all sessions are disabled unless
    // the last created session. Returns a session if there is any or false.

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
        var sessions = await this.getBy('active', 'true');
        // Removing private params like the token_secret
        return sessions.map( s => Utils.removeFromObject(this.get_doc(s), ['token_secret'], true));

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
