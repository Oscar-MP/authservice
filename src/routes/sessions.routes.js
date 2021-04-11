'use strict'

var express           = require('express');
const controller      = require('../controllers/session.controller.js');
const { permissions } = require('../common/middlewares');

var router = express.Router();

router.get('/list/active',
            permissions.required_permissions(45),
            controller.list_active_sessions
          );

module.exports = router;
