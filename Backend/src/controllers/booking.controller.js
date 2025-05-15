
const {BookingServices}=require('../services/booking.services')

class BookingControllerForUser{
    
    static book= async (req,res)=>{
        try{            
            const{ eventId }=req.body
            const userId  =req.userId
            
            const response= await BookingServices.book({userId,eventId})
            if(response.error){
              return  res.status(400).json({ error: response.message });
            }

            res.status(200).json({message:"booking done successfully",booking:response.booking })
        }catch(error){
            res.status(400).json({ error: err.message });
        }       
    }

    static read=async(req,res)=>{
        try{
            const userId =req.userId
            const response= await BookingServices.read({userId})
            if(response.error){
              return  res.status(400).json({ error: response.message });
            }
            res.status(200).json({message:"booking returned successfully",bookings:response.bookings })
        }catch(error){
            res.status(400).json({ error: err.message });
        } 
    }

    static cancel=async (req,res)=>{
        try{
            const userId =req.userId
            const eventId =req.params.eventId
            if(!eventId) {
                new Error("Missing Event information")
            }
            const response= await BookingServices.cancel({userId,eventId})
            if(response.error){
                new Error(response.message)
            }
            res.status(200).json({message:"booking returned successfully",booking:response.booking })
        }catch(error){
            res.status(400).json({ error: err.message });
        } 

    }

}

class BookingControllerForAdmin{
    static book= async (req,res)=>{
        try{
            const{ eventId,userId }=req.body
            const response= await BookingServices.book({userId,eventId})
            if(response.error){
                new Error(response.message)
            }
            res.status(200).json({message:"booking done successfully",booking:response.booking })
        }catch(error){
            res.status(400).json({ error: err.message });
        }       
    }

    static read=async(req,res)=>{
        try{
            const userId = req.query.userId || null;
            const response= await BookingServices.read({userId})
            if(response.error){
                new Error(response.message)
            }
            res.status(200).json({message:"booking returned successfully",bookings:response.bookings })
        }catch(error){
            res.status(400).json({ error: err.message });
        } 
    }

}

module.exports={BookingControllerForAdmin,BookingControllerForUser}