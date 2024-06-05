import axios from "axios";

const API_URL = "http://localhost:8080/item-categories";

// Function to get the token and headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/view`);
    return response.data;
  } catch (error) {
    console.error(
      "There was an error fetching the categories!",
      error.response || error
    );
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/view/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(
      `There was an error fetching the category with id ${id}!`,
      error.response || error
    );
    throw error;
  }
};

export const createCategory = async (category) => {
  try {
    const response = await axios.post(API_URL, category, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(
      "There was an error creating the category!",
      error.response || error
    );
    throw error;
  }
};

export const updateCategory = async (id, category) => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      category,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error(
      `There was an error updating the category with id ${id}!`,
      error.response || error
    );
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(
      `There was an error deleting the category with id ${id}!`,
      error.response || error
    );
    throw error;
  }
};
