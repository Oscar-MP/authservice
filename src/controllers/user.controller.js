const service = require('../services/user.service.js');

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
      console.log('[!] Error listing users: ', e)
      return res.status(500).send({
        message: 'Could not list the users'
      });
    }
  },
  get_user: async (req, res, next) => {
    // Returns the information about a signle user
    var id = req.params.id;

    try {
      var user = await service.getById(id);
    } catch (e) {
      console.log(`[!] Error listing the user with id: ${id}`);
      return res.status(500).send({
        message: 'Could not list the user'
      });
    }

    if (!user) {
      return res.status(404).send({
        message: 'User not found'
      });
    }

    return res.status(200).send({
      message: 'User has successfully listed',
      data: user
    })
  }
};
