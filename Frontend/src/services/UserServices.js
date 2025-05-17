import axios from "axios";
import API_BASE_URL from '../config/index';
const BASE_URL = API_BASE_URL + '/users';


export const getUsers = async () => {
  try {
    const res = await axios.get(BASE_URL,{
        withCredentials:true
    });
    return { success: true, data: res.data.users };
  } catch (error) {
    
    return { success: false, error: error.message };
  }
};
