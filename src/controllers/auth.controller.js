const service = require('../services/auth.service.js');
const { ErrorHandler }  = require('../common/helpers/error.js');
const { Logger }        = require('../common/helpers/logger.js');


module.exports = {
  signup: async (req, res, next) => {
    const params = req.body;

    try {
      const registrationData = await service.SignUp(params);

      return res.status(200).send({
        message: 'The user has been created!',
        data: registrationData
      });
    } catch ( err ) {
      next(ErrorHandler.stack(err, 'Could not sign up'));
    }
  },
  signin: async (req, res, next) => {

    const { username, password } = req.body;

    try {
      const session = await service.SignIn(username, password);

      if (!session) {
        throw new ErrorHandler(401, `Could not login. Incorrect username or password!`, { errorName: 'Unauthorized' });
      }

      return res.status(200).send({
        message: 'You have successfully logged in',
        data: session
      });
    } catch ( err ) {
      // Here an error have to be analized and if there is an error because of the client we will return error
      // if the error is because of the server then we will log it and avoid prompting any detail.
      next(ErrorHandler.stack(err, 'Could not sign in'));
    }
  },
  signout: async (req, res, next) => {

  }
};
