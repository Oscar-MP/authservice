'use strict'

module.exports = {
  mongodb: {
    mongodb_url: 'mongodb://localhost:27017/',
    database_name: 'auth'
  },
  port: 7850,
  log_errors: true,
  token_ttl: 60 * 60 * 6, // 6 Hours in seconds
  session_ttl: 1000 * 60 * 60 * 24 * 7 // 7 Days in miliseconds
}
