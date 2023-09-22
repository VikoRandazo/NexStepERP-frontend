import axios from "axios";
import { config } from "process";

// token
const instance = axios.create({
  baseURL: `http://localhost:5000`,
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(`token`);

    if (token) {
      config.headers[`Authorization`] = `Bearer ` + token;
    }
    return config;
  },
  (error) => {
   
    return Promise.reject(error);
  }
);
export default instance;
