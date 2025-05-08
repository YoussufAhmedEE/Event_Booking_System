
const {EventServices}=require('../services/event.services')
class EventController{
    

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



module.exports={EventController}