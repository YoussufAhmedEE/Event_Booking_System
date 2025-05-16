import axios from "axios";
import API_BASE_URL from '../config/index';

const BASE_URL = API_BASE_URL + '/category';

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, 
    });

    return { success: true, categoirs: response.data.categoirs };
  } catch (error) {
    console.log("ERROR:", error)
    console.log("Backend Error:", error.response?.data)
    return {
      success: false,
      error: error.response?.data || "Something went wrong. Please try again later.",
    };
  }
};
