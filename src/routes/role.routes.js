'use strict'

var express           = require('express');
const controller      = require('../controllers/role.controller.js');
const validator       = require('../common/validators/permissions.validator.js');

var router = express.Router();

router.get('/roles',              controller.list_roles);
router.get('/role/:id',           controller.get_role);
router.post('/role/create',       controller.create_role);
router.post('/role/:id/update',   controller.update_role);
router.delete('/role/:id/remove', controller.remove_role);


module.exports = router;
