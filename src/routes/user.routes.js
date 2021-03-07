var express       = require('express');
const controller  = require('../controllers/user.controller.js');

var router = express.Router();

// We should validate first that the user has enough permissions to list users
router.get('/users', controller.get_users);
router.get('/user/:id', controller.get_user);
router.get('/user/:id/history', controller.get_user_history);
router.post('/user/:id/update', controller.update_user);
router.delete('/user/:id', controller.remove_user);

module.exports = router;
