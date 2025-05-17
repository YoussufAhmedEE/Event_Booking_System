const {Booking} = require('../models/bookings.model');
const { Category } = require('../models/category.model');
const{Event}=require('../models/event.model')
const{User}=require('../models/user.model')
const{HelperValidations}=require('../validations/helper.validation')

class BookingServices{
    static book=async ({userId,eventId})=>{
        try{
                if(!HelperValidations.validateId(eventId) || !HelperValidations.validateId(userId)){
                    return {error:true, message: "Id Must be a positive-Number"}
                }

                const event=await Event.findOne({
                    where:{
                        id:eventId,
                        status:"Available"
                    }
                });

                if(!event){
                    return {error:true, message: "Event is not Available"}
                }
                const user=await User.findOne({
                    where:{id:userId}
                });
                if(!user){
                    return {error:true, message: "Wrong User Id"}

                }
                const bookingExist = await Booking.findOne({
                    where:{
                        eventId:eventId,
                        userId:userId,
                        status:"confirmed"
                    }
                });

                if (bookingExist){
                    return {error:true, message: "You aleardy booked this event"}

                }

                const booking = await Booking.create({eventId,userId})

                return{booking}
        }catch(error){
            return{error:true, message:error.message}
        }
    }

    static read= async({userId})=>{
        try{
            let where = {};
            
            if (userId && HelperValidations.validateId(userId))
                where.userId = userId;
                where.status ="confirmed"

            const bookings = await Booking.findAll({
                where,
                include: [
                    {
                        model: User,
                        attributes: ['id', 'firstName', 'lastName', 'email', 'phoneNumber'],
                    },
                    {
                        model: Event,
                        attributes: ['id','name', 'status', 'price'],
                        include:[
                            {
                                model:Category,
                                attributes:['name']
                            }
                        ]
                        
                    },

                ],
            });

            return{bookings}

        }catch(error){
            return{error:true, message:error.message} 
        }
    }



    static cancel=async ({userId,eventId})=>{
        try{
            
                if(!HelperValidations.validateId(eventId) || !HelperValidations.validateId(userId)){
                    return {error:true, message: "Id Must be a positive-Number"}
                }

                const event=await Event.findOne({
                    where:{
                        id:eventId,
                        status:"Available"
                    }
                });
                if(!event){
                    return {error:true, message: "Event is not Available"}
                }

                const booking = await Booking.findOne({eventId,userId});

                if (booking.status === "cancelled") {
                    return { error: true, message: "Booking is already canceled before" };
                }

                await booking.update({ status: "cancelled" });

                return { booking };

        }catch(error){
            return{error:true, message:error.message} 
        }
    }
}

module.exports = { BookingServices };