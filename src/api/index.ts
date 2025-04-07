import { API_BASE_URL } from "../constants/config";
import axios from "axios";

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {"Content-Type": "application/json"}
});

api.interceptors.request.use((config) => {

    config.headers.Authorization = `Bearer ${localStorage.getItem(
        "accessToken"
    )}`;
    return config;
});
