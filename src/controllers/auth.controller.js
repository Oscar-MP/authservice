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

  },
  signout: async (req, res) => {

  }
};
