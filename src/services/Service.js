'use strict'

var mongoose = require('mongoose');
const { Logger, ErrorHandler }       = require('../common/helpers');
const ObjectId = require('mongoose').Types.ObjectId;

class Service {

  constructor ( schema ) {
    this.schema = schema;
    this.error  = null;

  }

  async get ( _id ) {

    if (!ObjectId.isValid(_id))
      throw new ErrorHandler(400, 'Not a valid ID');

    try {
      var res = await this.schema.findById( _id );

      return res;

    } catch ( e ) {

      let error = ErrorHandler.isAClientError(e) ?
                    new ErrorHandler(400, 'Malformed query caused an error', e):
                    new ErrorHandler(500, 'Failed to perform the GET operation to the database', e);

      Logger.error(`Error trying to get the item ${_id} from the ${this.schema.constructor.modelName} schema`, e);
      throw error;
    }

    return false;
  }

  async getBy( param, value ) {

    var parameters = {};
    parameters[param] = value;

    try {
      const res = await this.schema.find(parameters).exec();
      return res;

    } catch ( e ) {
      Logger.error(`Error trying to get an item with this param:value = ${param}:${value}`);
      throw new ErrorHandler(500, 'Failed to perform a GET operation to the database', e);
    }

    return false
  }

  async get_all( options ) {
    // This method should be improved with filters, sortBy, OrderBy and limit results
    let { filter, limit, sortBy } = options || {};

    filter  = filter    ? filter : {};
    limit   = limit     ? Number(limit) : 100;
    sortBy  = sortBy    ? sortBy: {'createdAt': -1};

    try {
      var items = await this.schema.find  ( filter )
                                   .sort  ( sortBy )
                                   .limit ( limit );
      return this.get_doc(items);

    } catch (e) {
      Logger.error('Error getting the items of a collection', e);
      throw new ErrorHandler(500, 'Failed to perform a find operation to the database', e);
    }
  }

  async save( data ) {

    try {
      var res = await this.schema.create(data);

      if (res) {
        return this.get_doc(res);
      } else {
        throw new ErrorHandler(500);
      }
    } catch ( e ) {
      throw ErrorHandler.handleMongoError(e, 'Could not save data into the database');
    }

    return false;
  }

  async update ( _id, data ) {
    try {
      var item = await this.schema.findByIdAndUpdate(_id, data, { 'new': true})
      return item;

    } catch (e) {
      throw ErrorHandler.handleMongoError(e, 'Could not update the item');
    }
  }

  async delete ( _id ) {
    try {
      var item = await this.schema.findByIdAndDelete(_id);

      if (!item) throw new ErrorHandler(404, 'Item not found');

      return item;

    } catch (e) {
      throw ErrorHandler.handleMongoError(e, 'Could not remove the item');
    }
  }


  // Helper methods
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
