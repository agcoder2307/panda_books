import axios from "axios";
import { store } from "../app/store";
import { logout } from "../app/authSlice";

const baseUrl = "https://yourdomain.uz";

const request = axios.create({
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
    if (
      error.response.status === 403 &&
      error.response.message == "Unauthorized"
    ) {
      store.dispatch(logout());
    }
  }
);

export default request;
