const express = require("express");
const userRouter = express.Router();
const {UserController} = require("../controllers/user.controller");
const { isAdmin } = require("../middlewares/authentication.middleware");

// GET /api/users
userRouter.get("/", isAdmin , UserController.getAllUsers);

module.exports = {userRouter};
