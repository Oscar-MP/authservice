'use strict'

/**
 *  Autor:
 *  Date:
 *  Desription:
 */

const env       = 'dev'; // This will be implemented somewhere else
const chalk     = require('chalk');
const { ErrorHandler } = require('./src/common/helpers/error.js');
const { Logger } = require('./src/common/helpers/logger.js');

Logger.info('Iniciando aplicación...');

var mongo       = require('./config/mongodb.config.js');
const config = require('./config/environment.js').getConfig(env); //dev


const { server } = require('./src/server.js');

server.listen( config.PORT )
  .on('listening', () => {
    // Everything went well, the server is up and running
    console.log(chalk.bgBlue.green(chalk.bold(`\n[*] Servidor HTTP funcionando sin problemas:\n`) +
                                    `- PUERTO: ${config.PORT}\n` +
                                    `- MODO: ${env}\n` +
                                    `- DB: ${mongo.isConnected()}\n`))
  })
  .on('error', (err) => {
    Logger.error('Error al iniciar la aplicación', err, true);
    process.exit(0);
  });
