var express           = require('express');
const controller      = require('../controllers/auth.controller.js');
const validator       = require('../common/validators/user.validator.js');

var router = express.Router();

router.post('/signup', validator.validate_http_user_data, controller.signup);
router.post('/signin', validator.validate_signin_data, controller.signin);

module.exports = router;
