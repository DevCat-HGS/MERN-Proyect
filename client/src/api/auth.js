import axios from "./axios";

export const registerRequest = async (user) => {
  try {
    const response = await axios.post(`/auth/register`, user);
    return response.data;
  } catch (error) {
    console.error("Register error:", error.response?.data || error);
    throw error;
  }
};

export const loginRequest = async (user) => {
  try {
    const response = await axios.post(`/auth/login`, user);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error);
    throw error;
  }
};

export const verifyTokenRequest = async () => axios.get(`/auth/verify`);
