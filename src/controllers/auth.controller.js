const service = require('../services/auth.service.js');

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
      console.log('Something went wrong:', err)
      return res.status(500).send({ message: 'Something went wrong! We could not proceed with the signup'})
    }
  },
  signin: async (req, res) => {

    const params = req.body;

    try {
      const session = await service.SignIn(params.username, params.password);

      if (!session) {
        return res.status(401).send({
          message: 'Could not login'
        });
      }

      return res.status(200).send({
        message: 'You have successfully logged in',
        data: session
      });
    } catch ( err ) {
      // Here an error have to be analized and if there is an error because of the client we will return error
      // if the error is because of the server then we will log it and avoid prompting any detail.
      console.log('[!] LOGIN ERROR: ', err)
      return res.status(500).send({ message: 'Something went wrong during the login. Try again later... '});
    }
  },
  signout: async (req, res) => {

  }
};
