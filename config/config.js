'use strict'

const { Logger } = require('../src/common/helpers');

module.exports.getConfig = () => {
  try {
    return Object.assign(require('./globals.js'), require('./environments')[this.getEnvironment()]);
  } catch ( err ) {
    Logger.error('Could not load the environment config')
    process.exit(0);

  }
}


module.exports.getEnvironment = () => {
  // Establece el entorno por defecto
  const ENV = 'dev';


  return ENV;
}
