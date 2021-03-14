const service = require('../services/auth.service.js');
const { ErrorHandler, Logger, Response } = require('../common/helpers/index.js');

module.exports = {
  signup: async (req, res, next) => {
    const params = req.body;

    try {
      const { registrationData, activation_link } = await service.SignUp(params);

      return res.status(200).send({
        message: 'The user has been created!',
        data: registrationData,
        activation_link: activation_link
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
        throw new ErrorHandler(401, `Could not login. Incorrect username or password!`, { print: false });
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
  logout: async (req, res, next) => {

  },
  activate_account: async (req, res, next) => {
    // Once an email has been sent after the signup, the user must follow a link which will proceed with the
    // final step of the account verification. We will take the userid and the activation id and if everything matches we will activate
    // the account.
    // * An acctivation ID must be created during the signup
    const { randomSeed, userid, activation_id } = req.params;

    try {
      if ( await service.activateAccount(activation_id, userid) !== true ) {
        throw new ErrorHandler(500, 'Could not proceed with the user activation', { print: false });
      }

      return Response.send(res, 'Your user has been successfully activated! Now you can login.');

    } catch ( e ) {
      next(e);
    }


  }
};
