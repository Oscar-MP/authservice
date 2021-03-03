const service = require('../services/auth.service.js');
const { ErrorHandler }  = require('../common/helpers/error.js');
const { Logger }        = require('../common/helpers/logger.js');


module.exports = {
  signup: async (req, res) => {
    const params = req.body;

    try {
      const registrationData = await service.SignUp(params);

      return res.status(200).send({
        message: 'The user has been created!',
        data: registrationData
      });
    } catch ( err ) {
      Logger.error('Could not perform the sign up operation', err);
      next(err);
    }
  },
  signin: async (req, res) => {

    const { username, password } = req.body;

    try {
      const session = await service.SignIn(username, password);

      if (!session) {
        throw new ErrorHandler(401, 'Could not login!');
      }

      return res.status(200).send({
        message: 'You have successfully logged in',
        data: session
      });
    } catch ( err ) {
      // Here an error have to be analized and if there is an error because of the client we will return error
      // if the error is because of the server then we will log it and avoid prompting any detail.
      Logger.error('Something went wrong during the login.', err);
      next(err);
    }
  },
  signout: async (req, res) => {

  }
};
