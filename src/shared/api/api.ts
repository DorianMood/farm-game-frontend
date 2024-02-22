import axios from "axios";

export const $api = axios.create({
  baseURL: "http://localhost:8000/api", //import.meta.env.BASE_URL
  withCredentials: true,
});
