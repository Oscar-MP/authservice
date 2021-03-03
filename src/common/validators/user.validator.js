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
        return res.status(400).send({
          message: 'Missing user params'
        });
      }

      next();
  },
  validate_signin_data: async (req, res, next) => {
    var params = req.body;
    const required_params = ['username', 'password'];

    for ( let param of required_params ) {
      if (!params[param]) {
        return res.status(400).send({
          message: 'Unable to sign in, missing some params',
          param: param
        });
      }
    }

    next();
  }

}
