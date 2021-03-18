'use strict'

const { Utils } = require('../lib');

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

        return next(new ErrorHandler(400, 'Some params are missing!', { print: false}))
      }

      next();
  },
  validate_signin_data: async (req, res, next) => {
    var params = req.body;
    const required_params = ['username', 'password'];

    for ( let param of required_params ) {
      if (!params[param]) {
        return next(new ErrorHandler(400, `Could not sign in, missing '${param}' param`, { print: false }));
      }
    }

    next();
  }

}
