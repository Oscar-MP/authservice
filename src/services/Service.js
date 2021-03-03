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

  async getBy( param, value ) {
    console.log('Getting by ', param)
    var parameters = {};
    parameters[param] = value;

    try {
      const res = await this.schema.find(parameters).exec();
      console.log('RES: ', res);
      return res;
    } catch ( e ) {
      console.log(`[!] Error trying to get an item with this param:value = ${param}:${value}`);
    }

    return false
  }

  async searchBy ( param, value ) {

  }

  async get_all() {
    // This method should be improved with filters, sortBy, OrderBy and limit results
    var items = await this.schema.find();


    return this.get_doc(items);
  }

  async save( data ) {

    try {
      var res = await this.schema.create(data);

      if (res) {
        return this.get_doc(res);
      }
    } catch ( e ) {
      console.log('AGAIN AN ERROR!!!', e)
      throw e._message;
    }

    return false;
  }

  async update ( _id, data ) {

  }

  async delete ( _id ) {

  }


  get_doc ( items ) {
    // This method will return the _doc of a item or the _doc of many items.

    if (Array.isArray(items)) {
      return items.map((item) => {
        return item._doc != undefined ? item._doc : item;
      });
    }

    items = {...items};

    return items._doc ? items._doc : items;
  }
}


module.exports = Service;
