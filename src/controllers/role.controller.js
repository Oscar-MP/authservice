'use strict'

const service           = require('../services/role.service.js');
const { ErrorHandler }  = require('../common/helpers/error.js');
const { Logger }        = require('../common/helpers/logger.js');

var list_roles = async (req, res, next) => {
  // Lists all the roles
  try {
    var roles = await service.get_roles();

    if (!roles) next(new ErrorHandler(404, 'No roles were found!'));

    return res.status(200).send({
      message: 'The roles has been successfully retrieved!',
      data: roles
    });
  } catch (e) {
    next(e);
  }
}

var get_role = async (req, res, next) => {
  // Get a specific role
}

var create_role = async (req, res, next) => {
  // Creates a new role

  try {
    var role = await service.create_role(req.body);

    if (role) {
      return res.status(200).send({
        message: 'A new role has been created!',
        data: role
      });
    }
    next(new ErrorHandler(500));
  } catch (err) {
    next(err);
  }
}

var update_role = async (req, res, next) => {

}

var remove_role = async (req, res, next) => {

}

module.exports = {
  list_roles,
  get_role,
  create_role,
  update_role,
  remove_role
}
