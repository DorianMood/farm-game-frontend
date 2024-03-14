import axios from "axios";

console.log(import.meta.env);

export const $api = axios.create({
  baseURL: "http://localhost:8000/api", //import.meta.env.BASE_URL
  withCredentials: true,
});
