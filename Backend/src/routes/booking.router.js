const bookingRouter= require("express").Router();
const {isAdmin,isUser}=require('../middlewares/authentication.middleware');
const {BookingControllerForAdmin,BookingControllerForUser}=require('../controllers/booking.controller')

//user makes Book
bookingRouter.post('/book',isUser,BookingControllerForUser.book)

//admin makes Book for user
bookingRouter.post('/create',isAdmin,BookingControllerForAdmin.book)



//user read his Bookings
bookingRouter.get('/my',isUser,BookingControllerForUser.read)

//admin read all or for a specefic user  (userId in query parameter)
bookingRouter.get('/all',isAdmin,BookingControllerForAdmin.read)

//user cancel his booking
bookingRouter.patch('/cancel/:eventId',isUser,BookingControllerForUser.cancel)






module.exports={bookingRouter}