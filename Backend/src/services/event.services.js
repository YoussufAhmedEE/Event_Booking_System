const {User}=require("../models/user.model")
const {Event,EventImage}=require("../models/event.model")
const {EventTag}=require("../models/eventTags.model")

const {Booking}=require("../models/bookings.model")
const {Category}=require("../models/category.model")
const {Venue}=require("../models/venue.model")
const {Tag}=require("../models/tag.model")
const {AIServices}=require('../ai/grok')

const {validateEventData,validateEventDataUpdate}= require('../validations/event.validation')
class EventServices{
    static getAllEvents=async(where)=>{
            try {
              const events = await Event.findAll({
                where,
                include: [
                  { model: Category, attributes: ["name"] },
                  { model: Venue, attributes: ["name","latitude","longitude"] },
                  { model: EventImage, attributes: ['imageUrl', 'publicId'] },
                  { model: Tag, attributes: ["id", "name"] } 
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
            await this.generateAndAttachEventTags(event);
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

       static deleteEevet = async({eventId})=>{
        try{

            const event= await Event.findByPk(eventId)
            await event.destroy(eventId);

            return{error:false};

        }catch(error){         
            return{error:true, message:error.message}
        }

    }

static async generateAndAttachEventTags(event) {
  try {
    const category = await Category.findByPk(event.categoryId);
    if (!category) {
      console.warn("Category not found for event.");
      return;
    }

    // suggest tags via AI
    const aiResponse = await AIServices.suggesTags({
      category: category.name,
      description: event.description,
      numberofTags: 2,
    });

    console.log(aiResponse)
    let tagsToUse = [];

    if (aiResponse.error || !aiResponse.tags || aiResponse.tags.length === 0) {
      // if AI failed, fallback to random existing tags from same category
      const existingTags = await Tag.findAll({
        where: { categoryId: category.id },
        limit: 3,
      });

      tagsToUse = existingTags.map(t => t.name);
    } else {
      tagsToUse = aiResponse.tags;
    }

    // save tags in Tag model (if not exist)
    for (const tagName of tagsToUse) {
      let [tag] = await Tag.findOrCreate({
        where: {
          name: tagName,
          categoryId: category.id,
        },
      });

      // link tag with event
      await EventTag.create({
        eventId: event.id,
        tagId: tag.id,
      });
    }

  } catch (error) {
    console.error("Error generating/attaching tags:", error.message);
  }
}

}



module.exports={EventServices}