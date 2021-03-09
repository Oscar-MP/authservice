var express           = require('express');
const controller      = require('../controllers/user.controller.js');
const { PermissionValidator, ParamValidator } = require('../common/validators/index.js');


var router = express.Router();

// We should validate first that the user has enough permissions to list users
router.get('/users', controller.get_users);
router.get('/user/:id',
            ParamValidator.is_a_valid_id,
            controller.get_user
          );
router.get('/user/:id/history',
            ParamValidator.is_a_valid_id,
            controller.get_user_history
          );
router.post('/user/:id/update',
            ParamValidator.is_a_valid_id,
            controller.update_user
          );
router.delete('/user/:id',
              ParamValidator.is_a_valid_id,
              controller.remove_user
            );

module.exports = router;
