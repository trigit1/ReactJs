import axios from "axios";

const API_URL = "http://localhost:8080/items";

// Function to get the token and headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/view`);
    return response.data;
  } catch (error) {
    console.error(
      "There was an error fetching the items!",
      error.response || error
    );
    throw error;
  }
};

export const getItemById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/view/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(
      `There was an error fetching the item with id ${id}!`,
      error.response || error
    );
    throw error;
  }
};

export const createItem = async (item) => {
  try {
    const response = await axios.post(API_URL, item, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(
      "There was an error creating the item!",
      error.response || error
    );
    throw error;
  }
};

export const updateItem = async (id, item) => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      item,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error(
      `There was an error updating the item with id ${id}!`,
      error.response || error
    );
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(
      `There was an error deleting the item with id ${id}!`,
      error.response || error
    );
    throw error;
  }
};
