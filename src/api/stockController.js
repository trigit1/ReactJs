import axios from "axios";

const API_URL = "http://localhost:8080/stocks";

// Function to get the token and headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllStocks = async () => {
  try {
    const response = await axios.get(`${API_URL}/view`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(
      "There was an error fetching the stocks!",
      error.response || error
    );
    throw error;
  }
};

export const getStockById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(
      `There was an error fetching the stock with id ${id}!`,
      error.response || error
    );
    throw error;
  }
};

export const createStock = async (stock) => {
  try {
    const response = await axios.post(API_URL, stock, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(
      "There was an error creating the stock!",
      error.response || error
    );
    throw error;
  }
};

export const updateStock = async (id, stock) => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      stock,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error(
      `There was an error updating the stock with id ${id}!`,
      error.response || error
    );
    throw error;
  }
};

export const deleteStock = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(
      `There was an error deleting the stock with id ${id}!`,
      error.response || error
    );
    throw error;
  }
};
