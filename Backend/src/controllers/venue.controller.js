const {getVenuesService}=require("../services/venue.services")
const getVenues= async(req,res)=>{
     try {
    const venues = await getVenuesService();
    res.status(200).json({ success: true, venues });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports={getVenues}