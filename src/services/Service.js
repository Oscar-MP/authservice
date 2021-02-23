'use strict'

var mongoose = require('mongoose');


class Service {

  constructor ( schema ) {
    this.schema = schema;
    this.error  = null;

  }

  async get ( _id ) {
    try {
      var res = await this.schema.findById( _id );

      return res;

    } catch ( e ) {
      console.log(`[!] Error trying to get the item ${_id} from the ${this.schema.constructor.modelName} schema`);
    }

    return false;
  }

  async getBy( param ) {

  }

  async searchBy ( param, value ) {

  }

  async getAll() {

  }

  async save( data ) {

  }

  async update ( _id, data ) {

  }

  async delete ( _id ) {

  }
}

module.exports = Service;
