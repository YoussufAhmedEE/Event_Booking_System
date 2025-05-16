import axios from "axios";
import API_BASE_URL from '../config/index';

const BASE_URL = `${API_BASE_URL}/booking`;
//user books an event
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
//user cancels the reservation
export const cancel=async ({eventId})=>{
    try {
    const response = await axios.patch(`${BASE_URL}/cancel/${eventId}`,
        {
      withCredentials: true, 
      });

    return {success:true ,booking: response.data.booking };
  } catch (error) {
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
//check if the user booked this event or not
export const isEventBooked=async({eventId})=>{
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

/////////////////////////////////////////////////////////////////////////////
//admin can create a book for a user
export const Book=async ({eventId,userId})=>{
    try {
    const response = await axios.post(`${BASE_URL}/create`, 
    {eventId,userId}
        ,{
      withCredentials: true, 
    });

    return {success:true ,booking: response.data.booking };
  } catch (error) {
    return {
      success: false,
      error: error.response.data || "Something went wrong. Please try again later.",
    };
  }
}

//admin reads all book-user
export const Read=async({userId})=>{
    try {
    const response = await axios.get(`${BASE_URL}/all`
        ,{
          params:userId,
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
