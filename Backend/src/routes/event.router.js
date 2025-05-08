const eventRouter= require("express").Router();
const {isAdmin,isUser}=require('../middlewares/authentication.middleware');
const {EventController}=require('../controllers/event.controller')


eventRouter.post('./create-event',isAdmin,EventController.createEevet)



module.exports={eventRouter}