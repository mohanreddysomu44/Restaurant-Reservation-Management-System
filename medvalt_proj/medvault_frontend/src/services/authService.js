import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

export const register = async (user) => {
  return await axios.post(`${API_URL}/register`, user);
};