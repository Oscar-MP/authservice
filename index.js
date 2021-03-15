'use strict'

/**
 *  Autor:
 *  Date:
 *  Desription:
 */

const chalk     = require('chalk');
const { ErrorHandler, Logger } = require('./src/common/helpers');

Logger.info('Iniciando aplicación...');

var mongo       = require('./config/mongodb.config.js');
const Config = require('./config/config.js');
const config = Config.getConfig();

const { server } = require('./src/server.js');

server.listen( config.port )
  .on('listening', () => {
    // Everything went well, the server is up and running
    console.log(chalk.bgBlue.green(chalk.bold(`\n[*] Servidor HTTP funcionando sin problemas:\n`) +
                                    `- PUERTO: ${config.port}\n` +
                                    `- MODO: ${Config.getEnvironment()}\n` +
                                    `- DB: ${mongo.isConnected()}\n`))
  })
  .on('error', (err) => {
    Logger.error('Error al iniciar la aplicación', err, true);
    process.exit(0);
  });
