const {Venue}= require("../models/venue.model")

const getVenuesService=async ()=>{
    try{
        const venues= await Venue.findAll();
        return venues;
    }catch(error){
        return error;
    }
}
module.exports={getVenuesService}