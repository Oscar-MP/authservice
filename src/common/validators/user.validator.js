'use strict'

var utils = require('../utils.js');

module.exports = {
  validate_http_user_data: (req, res, next) => {
      // Checks if the provided data is valid for a user. Does not perform any search operation nor
      // validate the user. Only checks if there is enough data to move to the next layer
      var params = req.body;
      if (
        utils.isEmpty(params.username)                                          ||
        (utils.isEmpty(params.email) || !utils.validator.isEmail(params.email)) ||
        utils.isEmpty(params.password)
      ) {
        res.status(400).send({
          message: 'Could not validate the provided user data'
        });
      }

      next();
  }

}
