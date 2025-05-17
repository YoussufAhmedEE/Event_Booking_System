import axios from "axios";

import API_BASE_URL from '../config/index';

 const BASE_URL=API_BASE_URL+'/auth'

export const register = async (userData) => {
  try {
    console.log(userData)

    const response = await axios.post(`${BASE_URL}/register`, userData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // Ensures cookies (JWT) are sent & received
    });
    console.log(response.data)
    return { success: true, message: response.data.message };
  } catch (error) {
    
    console.log(error)
    return {
      success: false,
      error: error.response?.data?.message || "Something went wrong. Please try again later.",
    };
  }
};

export const login = async (userData) => {
  try {

    const response = await axios.post(`${BASE_URL}/login`, userData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // Ensures cookies (JWT) are sent & received
    });

    return { success: true, message: response.data.message ,isAdmin:response.data.isAdmin};
  } catch (error) {
    console.log("ERROR:", error)
    console.log("Backend Error:", error.response.data)


    return {
      success: false,
      error: error.response?.data || "Something went wrong. Please try again later.",
    };
  }
};
