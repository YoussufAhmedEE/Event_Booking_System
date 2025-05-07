const eventRouter= require("express").Router();
const {isAdmin,isUser}=require('../middlewares/authentication.middleware');
const {EventControllerForUser,EventControllerForAdmin}=require('../controllers/event.controller')

//user makes Book
eventRouter.post('/book',isUser,EventControllerForUser.book)

//admin makes Book for user
eventRouter.post('/create-book',isAdmin,EventControllerForAdmin.book)

eventRouter.post('./create-event',isAdmin,EventControllerForAdmin.createEevet)



module.exports={eventRouter}