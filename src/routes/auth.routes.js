var express       = require('express');
const controller  = require('../controllers/auth.controller.js');
const validators  = require('../common/validators/user.validator.js');

var router = express.Router();

router.post('/signup', validators.validate_http_user_data, controller.signup);
router.post('/signin', validators.validate_signin_data, controller.signin);

module.exports = router;
