const { User } = require('../models/user.model');
const { UserRole } = require('../models/userRole.model'); 
const {Booking} =require('../models/bookings.model')
const { Op } = require("sequelize");

class UserServices {
static async getAllUsers() {
  try {
    // Get all user IDs that have roleId = 2
    const excludedRoles = await UserRole.findAll({
      where: {
        roleId: 2,
      },
      raw: true,
    });

    const excludedUserIds = excludedRoles.map((r) => r.userId);

    // Get all users except those IDs
    const users = await User.findAll({
      where: {
        id: {
          [Op.notIn]: excludedUserIds,
        },
      },
      attributes: ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'gender'],
      raw: true,
    });

    // Loop على اليوزرز و هات عدد الحجزات بتاع كل واحد
    for (let i = 0; i < users.length; i++) {
      const bookingCount = await Booking.count({
        where: {
          userId: users[i].id,
        },
      });

      // Add bookingCount field
      users[i].bookingCount = bookingCount;
    }

    return { users };
  } catch (error) {
    console.log(error);
    return { error: true, message: error.message };
  }
}


}

module.exports = { UserServices };
