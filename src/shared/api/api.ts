import axios from "axios";

export const $api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://93.93.207.63:8080/api",
  withCredentials: true,
});
