const {UserServices}=require('../services/user.services')
class UserController {
  static async getAllUsers(req, res) {
    try {
      const {users} = await UserServices.getAllUsers();

      res.status(200).json({users});
    } catch (error) {
     
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = {UserController};
