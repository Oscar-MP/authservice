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
  }
};
