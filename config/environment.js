'use strict'

module.exports =  {
  getConfig: ( env ) => {
    const config = {
      dev: {
        mongodb: {
          mongodb_url: 'mongodb://localhost:27017/',
          database_name: 'auth'
        },
        PORT: 7850
      },
      prod: {

      }
    }

    return config[env] || config.dev;
  }
}
