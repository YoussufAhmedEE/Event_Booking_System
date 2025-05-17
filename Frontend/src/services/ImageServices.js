import axios from "axios";
import API_BASE_URL from '../config/index';
const BASE_URL = API_BASE_URL + '/image';

export const uploadImage = async (eventId, imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axios.post(`${BASE_URL}/upload/${eventId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
    
      },
      withCredentials:true
       });
    return response.data;
  } catch (error) {
    console.error("Image upload failed:", error);
    return { success: false, error: error.message };
  }
};
