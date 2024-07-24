import axios from "axios";
import {RoutePath} from "shared/config/routeConfig/routeConfig";
import {mockRest} from "./utils.ts";


export const $api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? "https://93.93.207.63:444/api",
    withCredentials: true,
});


// INFO: redicrect on 401 or other errors
$api.interceptors.response.use(
    (response) => {
        if (sessionStorage.getItem('activeTutorial')) {
            response = mockRest(response)
        }
        return response
    },
    (error) => {
        if (error.response.status === 401) {
            window.location.href = RoutePath.main;
        }
        return error;
    },
);
// http://localhost:8000/api
// http://2603067-tv87273.twc1.net:81/
