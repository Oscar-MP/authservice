'use strict'

/**
 *  Autor:
 *  Date:
 *  Desription:
 */

var mongo       = require('./config/mongodb.config.js');
const env       = 'dev'; // This will be implemented somewhere else
const messages  = require('./src/common/messages.js');
const chalk     = require('chalk');

const config = require('./config/environment.js').getConfig(env); //dev

messages.info('Iniciando aplicación...');

const { server } = require('./src/server.js');


server.listen( config.PORT )
  .on('listening', () => {
    // Everything went well, the server is up and running
    console.log(chalk.bgBlue.green(`[*] Aplicación funcionando sin problemas:\n- PUERTO: ${config.PORT}\n- MODO: ${env}`))
  })
  .on('error', (err) => {
    console.log('[!] Error al iniciar la aplicación');
    console.error('[-]', err.message);
    process.exit(0);
  });
