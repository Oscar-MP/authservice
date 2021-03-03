'use strict'

var express           = require('express');
const controller      = require('../controllers/session.controller.js');
const validator       = require('../common/validators/permissions.validator.js');

var router = express.Router();

router.get('/list/active', validator.check_permission ,controller.list_active_sessions);

module.exports = router;
