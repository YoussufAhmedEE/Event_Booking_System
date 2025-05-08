const eventRouter= require("express").Router();
const {isAdmin,isUser}=require('../middlewares/authentication.middleware');
const {EventController}=require('../controllers/event.controller')
const {eventOptionsMiddleware}=require('../middlewares/eventOptions.middleware')


eventRouter.post('/create',isAdmin,EventController.createEevet)
eventRouter.patch('/update/:eventId',isAdmin,EventController.updateEevet)

eventRouter.get('/all',isUser,eventOptionsMiddleware , EventController.getAllEvents)





module.exports={eventRouter}