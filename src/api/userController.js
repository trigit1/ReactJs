import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/addNewUser`, user);
    return response.data;
  } catch (error) {
    console.error("There was an error registering the user!", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/generateToken`, credentials);
    return response.data;
  } catch (error) {
    console.error("There was an error logging in the user!", error);
    throw error;
  }
};

export const getUserDetails = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/user/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the user details!", error);
    throw error;
  }
};
