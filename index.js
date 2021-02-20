'use strict'

/**
 *  Autor:
 *  Date:
 *  Desription:
 */

var mongo = require('./config/mongodb.config.js');
const env = 'dev'; // This will be implemented somewhere else

const config = require('./config/environment.js').getConfig(env); //dev

console.log('[+] Iniciando aplicación...');

const { server } = require('./src/server.js');


server.listen( config.PORT )
  .on('listening', () => {
    // Everything went well, the server is up and running
    console.log('[*] Aplicación funcionando sin problemas:')
    console.log(`- PUERTO: ${config.PORT}`);
    console.log(`- MODO: ${env}`);
  })
  .on('error', (err) => {
    console.log('[!] Error al iniciar la aplicación');
    console.error('[-]', err.message);
    process.exit(0);
  });
