'use strict'

/**
 *  Autor: Sleider
 *  Date: 20/02/21
 *  Desription: This file creates a conection with mongodb using mongoose.
 */

const   mongoose  = require('mongoose');
const   config    = require('./environment.js').getConfig();
const   chalk     = require('chalk');
const messages  = require('../src/common/messages.js');

class MongoConnection {

  constructor() {
    const url = `${config.mongodb.mongodb_url}${config.mongodb.database_name}`;
    const mongoose_options = {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    };

    mongoose.Promise = global.Promise;

    this.connection = this.connect(url, mongoose_options);

    // Event triggers
    mongoose.connection.on('connected', this.onConnect );
    mongoose.connection.on('error', this.onError );
    mongoose.connection.on('disconnected', this.onDisconnect );
    mongoose.connection.on('SIGNIT', this.onSignit );
  }

  async connect (url, opts) {
    messages.info('Connecting to MongoDB...');
    return await mongoose.connect(url, opts);
  }

  // Event Handlers
  onConnect () {
    messages.success(`Conexión con mongodb establecida en: ${config.mongodb.mongodb_url}`)
  }

  onError (err) {
    console.log(chalk.red('[!] No se ha podido establecer la conexión con mongodb'));
    console.error('[-]', err.message);
    process.exit(0);
  }

  onDisconnect () {
    console.log(chalk.red('[!] Se ha desconectado de mongodb'));
  }

  onSignit () {
    console.log('[!] Se ha encontrado un error fatal, cerrando la conexión');
    mongoose.connection.close(() =>{
      console.log('[-] Conexión cerrada.');
      process.exit(0);
    })
  }

  isConnected() {
    const states = ['disconected', 'connected', 'connecting', 'disconnecting'];
    return states[mongoose.connection.readyState];
  }
}


module.exports = new MongoConnection();
