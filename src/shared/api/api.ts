import axios from "axios";

export const $api = axios.create({
  baseURL: "http://93.93.207.63:8000/api", //import.meta.env.BASE_URL
  withCredentials: true,
});
