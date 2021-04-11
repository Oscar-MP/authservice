'use strict'

const service           = require('../services/role.service.js');
const { ErrorHandler, Logger, Response }  = require('../common/helpers');

var list_roles = async (req, res, next) => {
  // Lists all the roles
  try {
    var roles = await service.get_roles();

    if (!roles) return next(new ErrorHandler(404, 'No roles were found!'));

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

  const id = req.params.id;

  try {
    var role = await service.get(id);

    if (!role) {
      return next(new ErrorHandler(404, `Role '${id}' not found!`));
    }
  } catch ( err ) {
    return next(ErrorHandler.stack(err, `Could not get the role with id: ${id}`));
  }


  Response.send(res, `Information about role '${id}' has been successfully fetched.`, role)

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
  const id = req.params.id;

  try {
    var updated_role = await service.update(id, req.body);

    if (!updated_role) {
      return next(new ErrorHandler(404, `Role '${id}' not found!`, null, { print: false }));
    }

    Response.send(res, 'The role has been updated!', updated_role);

  } catch ( err ) {
    return next(ErrorHandler.stack(err, 'Could not update the role with the id: ' + id));
  }
}

var remove_role = async (req, res, next) => {
  const id = req.params.id;

  try {
    var removed_role = await service.delete(id);

    if (!removed_role) {
      return next(new ErrorHandler(404, `Role '${id}' not found in the server!`));
    }

    Response.send(res, `The role '${id}' has been removed!`, removed_role);

  } catch ( err ) {
    return next(ErrorHandler.stack(err, `Could not erease the role: ${id}`));
  }
}

module.exports = {
  list_roles,
  get_role,
  create_role,
  update_role,
  remove_role
}
