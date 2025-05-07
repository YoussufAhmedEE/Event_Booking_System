const {AuthenticationController}= require("../controllers/authentication.controller");
const authRouter = require("express").Router();



authRouter.post("/register",AuthenticationController.register)


authRouter.post("/login", AuthenticationController.login)



module.exports = {authRouter};