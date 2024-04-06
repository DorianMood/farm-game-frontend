import axios from "axios";

export const $api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "https://93.93.207.63:444/api",
  withCredentials: true,
});
