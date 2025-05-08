const {User}=require("../models/user.model")
const {Event}=require("../models/event.model")
const {Booking}=require("../models/bookings.model")
const validateEventData= require('../validations/event.validation')


class EventServices{
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