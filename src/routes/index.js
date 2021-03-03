'use strict'

module.exports = {
  auth: require('./auth.routes.js'),
  users: require('./user.routes.js'),
  sessions: require('./sessions.routes.js')
}
