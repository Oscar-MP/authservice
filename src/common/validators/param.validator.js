'use strict'

const ObjectId = require('mongoose').Types.ObjectId;
const { ErrorHandler } = require('../helpers/error.js');

const is_a_valid_id = (req, res, next) => {
  // This function checks if the id given in the params is valid
  let _id = req.params.id || req.body._id || req.body.id;

  if (!_id)
    return next(new ErrorHandler(400, 'We can\'t find the ID in your request!'));

  if (!ObjectId.isValid(_id))
    return next(new ErrorHandler(400, `The ID: '${_id}' is not valid.`));

  next();
}

module.exports = { is_a_valid_id }
