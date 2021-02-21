const service = require('../services/auth.service.js');

module.exports = {
  signup: async (req, res) => {
    const params = req.body;

    try {
      const registrationData = await service.signup(params);

      return res.status(200).send({
        message: 'The user has been created!',
        data: registrationData
      });
    } catch ( err ) {
      return res.status(500)
    }
  },
  signin: async (req, res) => {

  },
  signout: async (req, res) => {

  }
};
