'use strict'

/**
 *  Autor: Sleider
 *  Date: 20/02/21
 *  Desription: This file creates a conection with mongodb using mongoose.
 */

const   mongoose  = require('mongoose');
const   config    = require('./config.js').getConfig();
const { Logger }  = require('../src/common/helpers');

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
    Logger.info('Connecting to MongoDB...');
    return await mongoose.connect(url, opts);
  }

  // Event Handlers
  onConnect () {
    Logger.success(`Conexión con mongodb establecida en: ${config.mongodb.mongodb_url}`)
  }

  onError (err) {
    Logger.error('No se ha podido establecer la conexión con mongodb', err);
    process.exit(0);
  }

  onDisconnect () {
    Logger.info('Se ha desconectado de mongodb');
  }

  onSignit () {
    Logger.error('Se ha encontrado un error fatal, cerrando la conexión', null, true);
    mongoose.connection.close(() =>{
      Logger.info('Conexión cerrada.');
      process.exit(0);
    })
  }

  isConnected() {
    const states = ['disconected', 'connected', 'connecting', 'disconnecting'];
    return states[mongoose.connection.readyState];
  }
}


module.exports = new MongoConnection();
