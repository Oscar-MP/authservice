'use strict'

const { Logger } = require('../src/common/helpers');

module.exports.getConfig = ( environment ) => {
  try {
    return require('./environments')[environment];
  } catch ( err ) {
    Logger.error('Could not load the environment config')
    process.exit(0);

  }
}
