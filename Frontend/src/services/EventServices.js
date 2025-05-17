import axios from "axios";
import API_BASE_URL from '../config/index';
import {myBookings} from './BookServices'
const BASE_URL = API_BASE_URL + '/event';

export const getEvents = async (options = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/all`, {
      params: options, // these are query params
      headers: { "Content-Type": "application/json" },
      withCredentials: true, 
    });

    return { success: true, events: response.data.events };
  } catch (error) {
    console.log("ERROR:", error)
    console.log("Backend Error:", error.response?.data)
    return {
      success: false,
      error: error.response?.data || "Something went wrong. Please try again later.",
    };
  }
};

export const createEvent = async (data) => {
  try {
    console.log("data: ",data)
    const response = await axios.post(`${BASE_URL}/create`,data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, 
    });

    console.log("response: ",response.data);
    return { success: true, event: response.data.event };
  } catch (error) {
    console.log("ERROR:", error)
    console.log("Backend Error:", error.response?.data)
    return {
      success: false,
      error: error.response?.data || "Something went wrong. Please try again later.",
    };
  }
};


export const deleteEvent = async (eventId) => {
  try {
  
    const response = await axios.delete(`${BASE_URL}/delete/${eventId}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, 
    });

    return { success: true, event: response.data.event };
  } catch (error) {
    console.log("ERROR:", error)
    console.log("Backend Error:", error.response?.data)
    return {
      success: false,
      error: error.response?.data || "Something went wrong. Please try again later.",
    };
  }
};

export const updateEvent = async (data) => {
  try {

        const eventId =data.id;
          console.log("eventId: ",eventId)
    console.log("data: ",data)


  
    const response = await axios.patch(`${BASE_URL}/update/${eventId}`,data,{
      headers: { "Content-Type": "application/json" },
      withCredentials: true, 
    });

    return { success: true, event: response.data.event };
  } catch (error) {
    console.log("ERROR:", error)
    console.log("Backend Error:", error.response?.data)
    return {
      success: false,
      error: error.response?.data || "Something went wrong. Please try again later.",
    };
  }
};



export const BookedEvents = async () => {
  const response = await myBookings();

  if (!response.bookings || !Array.isArray(response.bookings)) {
    return { success: false, events: [] };
  }

  const events = response.bookings.map((booking) => {
    const event= booking.Event;
    return event;
  });

  return { success: true, events };
};

