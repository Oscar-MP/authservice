'use strict'

/**
 *  Autor:
 *  Date:
 *  Desription:
 */

const env       = 'dev'; // This will be implemented somewhere else
const messages  = require('./src/common/messages.js');
const chalk     = require('chalk');

messages.info('Iniciando aplicación...');

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
    console.log('[!] Error al iniciar la aplicación');
    console.error('[-]', err.message);
    process.exit(0);
  });
