import axios from "axios";
import { store } from "../app/store";
import { logout } from "../app/authSlice";

const baseUrl = import.meta.env.VITE_BASE_URL;

const request = axios.create({
  baseURL: baseUrl,
});
export const public_request = axios.create({
  baseURL: baseUrl,
});

request.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      console.log("Token expired → logging out");
      store.dispatch(logout());
    }
    return Promise.reject(error);
  },
);

export default request;
