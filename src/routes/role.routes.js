'use strict'

var express           = require('express');
const controller      = require('../controllers/role.controller.js');
const { PermissionValidator, ParamValidator }       = require('../common/validators/index.js');

var router = express.Router();

router.get('/roles',
            controller.list_roles
          );
router.get('/role/:id',
            ParamValidator.is_a_valid_id,
            controller.get_role
          );
router.post('/role/create',
              controller.create_role
           );
router.post('/role/:id/update',
              ParamValidator.is_a_valid_id,
              controller.update_role
           );
router.delete('/role/:id/remove',
                ParamValidator.is_a_valid_id,
                controller.remove_role
             );


module.exports = router;
