const {User}=require("../models/user.model")
const {Event}=require("../models/event.model")
const {Booking}=require("../models/bookings.model")
const{HelperValidations}=require('../validations/helper.validation')
const validateEventData= require('../validations/event.validation')


class EventServices{

    static book=async ({userId,eventId})=>{
        try{
                if(!HelperValidations.validateId(eventId) ||HelperValidations.validateId(userId)){
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

                const booking = await Booking.create({eventId,userId})

                return{booking}

        }catch(error){
            return{error:true, message:error.message}
        }
    }

    static createEvent = async(data)=>{
        try{
            const {error , value}=validateEventData(data);

            if (error) {
                    return { error: true, message: error.details[0].message };
                }

            const event = await Event.create(value);

            return {event};

        }catch(error){         
            return{error:true, message:error.message}
        }

    }

}


module.exports={EventServices}