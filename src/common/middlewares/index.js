'use strict';

module.exports = {
  catch_session: require('./catch-session.middleware').catch_session,
  catch_token: require('./catch-token.middleware').catch_token,
  permissions: require('./permission.middleware')
}
