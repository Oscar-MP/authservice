'use strict'

/**
 *  Autor: Sleider
 *  Date: 20/02/21
 *  Desription: This file creates a conection with mongodb using mongoose.
 */

const   mongoose  = require('mongoose');
const   config    = require('./environment.js').getConfig();


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

    this.connect(url, mongoose_options);

    // Event triggers
    mongoose.connection.on('connected', this.onConnect );
    mongoose.connection.on('error', this.onError );
    mongoose.connection.on('disconnected', this.onDisconnect );
    mongoose.connection.on('SIGNIT', this.onSignit );
  }

  async connect (url, opts) {
    await mongoose.connect(url, opts);
  }

  // Event Handlers
  onConnect () {
    console.log(`[*] Conexión con mongodb establecida en: ${config.mongodb.mongodb_url}`);
  }

  onError (err) {
    console.log('[!] No se ha podido establecer la conexión con mongodb');
    console.error('[-]', err.message);
    process.exit(0);
  }

  onDisconnect () {
    console.log('[-] Se ha desconectado de mongodb');
  }

  onSignit () {
    console.log('[!] Se ha encontrado un error fatal, cerrando la conexión');
    mongoose.connection.close(() =>{
      console.log('[-] Conexión cerrada.');
      process.exit(0);
    })
  }
}


module.exports = new MongoConnection();
