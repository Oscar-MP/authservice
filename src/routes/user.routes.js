var express           = require('express');
const controller      = require('../controllers/user.controller.js');
const { PermissionValidator, ParamValidator } = require('../common/validators');
const { permissions } = require('../common/middlewares');

var router = express.Router();

// We should validate first that the user has enough permissions to list users
router.get('/users', controller.get_users);
router.get('/user/:id',
            permissions.required_permissions(45),
            ParamValidator.is_a_valid_id,
            controller.get_user
          );
router.get('/user/:id/history',
            permissions.required_permissions(85),
            ParamValidator.is_a_valid_id,
            controller.get_user_history
          );
router.post('/user/:id/update',
            permissions.required_permissions(75),
            ParamValidator.is_a_valid_id,
            controller.update_user
          );
router.delete('/user/:id',
              permissions.required_permissions(75),
              ParamValidator.is_a_valid_id,
              controller.remove_user
            );

module.exports = router;
