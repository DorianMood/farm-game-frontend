import axios from "axios";

export const $api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "https://93.93.207.63:444/api",
  withCredentials: true,
});
// http://localhost:8000/api
// http://2603067-tv87273.twc1.net:81/
