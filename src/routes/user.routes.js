var express       = require('express');
const controller  = require('../controllers/user.controller.js');

var router = express.Router();

// We should validate first that the user has enough permissions to list users
router.get('/users', controller.get_users);
router.get('/user/:id', controller.get_user);

module.exports = router;
