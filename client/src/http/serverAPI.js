import axios from "axios";

export const API_URL = `http://localhost:8000/api`;

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export const setCars = (cars) => {
  api.post(`${API_URL}/setcars`, { ...cars });
};

export const getCars = () => {
  api.get(`${API_URL}/getcars`);
};
