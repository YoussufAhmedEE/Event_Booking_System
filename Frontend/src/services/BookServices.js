import axios from "axios";
import API_BASE_URL from '../config/index';

const BASE_URL = `${API_BASE_URL}/booking`;

export const book=async ({eventId})=>{
    try {
    const response = await axios.post(`${BASE_URL}/book`, 
    {eventId}
        ,{
      withCredentials: true, 
    });

    return {success:true ,booking: response.data.booking };
  } catch (error) {
    console.log("ERROR:", error)
    console.log("Backend Error:",  error.message)
    return {
      success: false,
      error: error.response.data || "Something went wrong. Please try again later.",
    };
  }
}

//User Reads his bookings
export const myBookings=async()=>{

    try {
    const response = await axios.get(`${BASE_URL}/my`
        ,{
      withCredentials: true, 
    });

    return {bookings: response.data.bookings };
  } catch (error) {
    return {
      success: false,
      error: error.response.data || "Something went wrong. Please try again later.",
    };
  }

}
export const IsEventBooked=async({eventId})=>{
    try {
    const {bookings}=await myBookings();
    console.log(bookings)

    for(let booking of bookings){
        if(booking.Event.id==eventId)
                return true;
    }
    return false;
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }

}