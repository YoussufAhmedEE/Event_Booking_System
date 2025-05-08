const {User}=require("../models/user.model")
const {Event}=require("../models/event.model")
const {Booking}=require("../models/bookings.model")
const {Category}=require("../models/category.model")
const {Venue}=require("../models/venue.model")


const {validateEventData,validateEventDataUpdate}= require('../validations/event.validation')
class EventServices{
    static getAllEvents=async(where)=>{
            try {
              const events = await Event.findAll({
                where,
                include: [
                  { model: Category, attributes: ["name"] },
                  { model: Venue, attributes: ["name","latitude","longitude"] }
                ]
              });
          
              return {events: events };
          
            } catch (error) {
              return { error: true, message: error.message };
            }

    }
    static createEvent = async({data})=>{
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

    static async updateEvent({ data, eventId }) {
        try {
    
          // Validate provided data only
          const { error, value } =  validateEventDataUpdate(data);
          if (error) {
            return { error: true, message: error.details.map(d => d.message).join(', ') };
          }
    
          // Check event existence
          const event = await Event.findByPk(eventId);
          if (!event) {
            return { error: true, message: 'Event not found' };
          }
    
          // Update attributes that exist in data
        await event.update(value);
    
          return {event: event };
    
        } catch (err) {
            return { error: true, message: 'Server error', error: err };
        }
      }

}


module.exports={EventServices}