
const {EventServices}=require('../services/event.services')
class EventController{
    
    static getAllEvents=async (req,res)=>{
        try{
            const options =req.eventOptions
            const response= await EventServices.getAllEvents(options)
            if(response.error){
                return res.status(400).json({ error: response.message });
            }
            res.status(200).json({message:"Events returned successfully",events:response.events })
        }catch(error){
            res.status(400).json({ error: error.message });
        }
    }
    static createEevet=async (req,res)=>{
        try{
            const data =req.body
            console.log(data)
            const response= await EventServices.createEvent({data})
            if(response.error){
                return res.status(400).json({ error: response.message });
            }
            res.status(200).json({message:"Event Created successfully",event:response.event })
        }catch(error){
            res.status(400).json({ error: error.message });
        }

    }

    static updateEevet=async (req,res)=>{
        try{
            let {
                name,
                description,
                categoryId,
                startDate,
                startTime,
                endTime,
                venueId,
                status,
                price
                } = req.body;

                let data = {
                name,
                description,
                categoryId,
                startDate,
                startTime,
                endTime,
                venueId,
                status,
                price
                };

            const eventId=req.params.eventId;
            const response= await EventServices.updateEvent({data,eventId})
            if(response.error){
                return res.status(400).json({ error: response.message });
            }
            res.status(200).json({message:"Event Updated successfully",event:response.event })
        }catch(error){
            res.status(400).json({ error: err.message });
        }

    }

    static deleteEevet=async (req,res)=>{
        try{
            const eventId=req.params.eventId;
            const response= await EventServices.deleteEevet({eventId})
            if(response.error){
                return res.status(400).json({ error: response.message });
            }
            res.status(200).json({message:"Event deleted successfully"})
        }catch(error){
            res.status(400).json({ error: err.message });
        }

    }

}



module.exports={EventController}