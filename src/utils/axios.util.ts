import axios from "axios";
import { getToken } from "./log.util";

// console.log(import.meta.env);
export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
});

export const protectedAxiosInstance = () =>
  axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
