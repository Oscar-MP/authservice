'use strict'

const { ErrorHandler, Logger } = require('../common/helpers');
const Role = require('../models/role.model.js');
const Service = require('./Service.js')


class RoleService extends Service {
  constructor() {
    super(Role);
  }

  async get_roles() {
    // This function will return all the roles

    try {
      // Get's all roles in an ascending permission level sorting
      var roles = await this.get_all({ sortBy : {'permissionLevel': 'ascending'}});

      return roles;

    } catch (e) {
      throw ErrorHandler.stack(e, 'Could not list the roles');
    }
  }

  async get_role( _id ) {

  }

  async create_role( role_data ) {

    try {
      var saved_role = await this.save(role_data);

      if (saved_role) {
          return saved_role;
      }

      throw new ErrorHandler(500, 'Could not create the role');

    } catch (e) {
      throw ErrorHandler.stack(e, 'Could not create the role');
    }

  }

  async update_role ( _id, role_data) {

  }

  async remove_role ( _id ) {
    // We cannot delete a role if there are users asigned to that role.
  }
}

module.exports = new RoleService();
