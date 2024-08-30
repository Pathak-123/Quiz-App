import axios from 'axios';

// const API_URL  = 'http://localhost:3000/api/v1/user';
const API_URL  = 'https://quiz-app-backend-y40k.onrender.com/api/v1/user';

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Login failed';
  }
};

export const registerUser = async (signUpData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, signUpData);
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Signup failed';
  }
};
