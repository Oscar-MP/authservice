const service           = require('../services/user.service.js');
const { ErrorHandler }  = require('../common/helpers/error.js');
const { Logger }        = require('../common/helpers/logger.js');

module.exports = {
  get_users: async (req, res, next) => {
    // This controller lists all users from the database.

    try {
      var users = await service.get_users();

      return res.status(200).send({
        message: 'The users have been successfully retrieved',
        data: users
      });
    } catch (e) {
      Logger.error('Could not list users', e);
      next(e);
    }
  },
  get_user: async (req, res, next) => {
    // Returns the information about a signle user
    var id = req.params.id;

    try {
      var user = await service.getById(id);
    } catch (e) {
      Logger.error(`Error listing the user with id: ${id}`, e)
      return next(e);
    }

    if (!user) {
      next(new ErrorHandler(404, `User '${id}' not found.`));
    } else {
      return res.status(200).send({
        message: 'User has successfully listed',
        data: user
      })
    }

    next(undefined);
  },
  update_user: async (req, res, next) => {
    const _id = req.params.id;

    try {
      var updated_user = await service.update(_id, req.body);

      return res.status(200).send({
        message: 'User updated successfully!',
        data: updated_user,
        updated: true
      })
    } catch (e) {
      next(e);
    }
  },
  remove_user: async (req, res, next) => {
    const _id = req.params.id;

    try {
      var removed_user = await service.delete(_id);
      return res.status(200).send({
        message: 'User removed successfully',
        data: removed_user,
        deleted: true
      });
    } catch (e) {
      next(e);
    }
  },
  get_user_history: async (req, res, next) => {
    res.status(200).send({ ok:'ok'})
  }

};
