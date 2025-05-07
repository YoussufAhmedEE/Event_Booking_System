
const {EventServices}=require('../services/event.services')

class EventControllerForUser{
    
    static book= async (req,res)=>{
        try{            
            const{ eventId }=req.body
            const userId  =req.userId
            const response= await EventServices.book({userId,eventId})
            if(response.error){
                new Error(response.message)
            }

            res.status(200).json({message:"booking done successfully",booking:response.booking })
        }catch(error){
            res.status(400).json({ error: err.message });
        }       
    }

}

class EventControllerForAdmin{
    
    static book= async (req,res)=>{
        try{
            const{ eventId,userId }=req.body
            const response= await EventServices.book({userId,eventId})
            if(response.error){
                new Error(response.message)
            }
            res.status(200).json({message:"booking done successfully",booking:response.booking })
        }catch(error){
            res.status(400).json({ error: err.message });
        }       
    }
    
    static createEevet=async (req,res)=>{
        try{
            const data =req.body
            const response= await EventServices.createEevet(data)
            if(response.error){
                new Error(response.message)
            }
            res.status(200).json({message:"booking done successfully",event:response.event })
        }catch(error){
            res.status(400).json({ error: err.message });
        }

    }

}



module.exports={EventControllerForUser,EventControllerForAdmin}