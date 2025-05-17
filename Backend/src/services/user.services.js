const { User } = require('../models/user.model');
const { UserRole } = require('../models/userRole.model'); 
const { Op } = require("sequelize");

class UserServices {
  static async getAllUsers() {
    try {
      // Get all user IDs that have roleId != 2
      const excludedRoles = await UserRole.findAll({
        where: {
          roleId: {
            [Op.ne]: 2
          }
        },
        raw: true
      });

      const excludedUserIds = excludedRoles.map(r => r.userId);

      // Fetch users excluding those IDs
      const users = await User.findAll({
        // where: {
        //   id: {
        //     [Op.notIn]: excludedUserIds
        //   }
        // },
        attributes: ['id','firstName','lastName','email','phoneNumber','gender'],
      });

      return { users };
    } catch (error) {
      return { error: true, message: error.message };
    }
  }
}

module.exports = { UserServices };
