
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/';

// Function to handle user registration
export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Function to handle user login
export const loginUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

