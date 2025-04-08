import { API_BASE_URL, endpoints } from "../constants/config";
import axios from "axios";
import { Tokens } from "../types/tokens";



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

api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
        const response = await axios.get<Tokens>(API_BASE_URL + endpoints.refresh, {withCredentials: true})
        localStorage.setItem("accessToken", response.data.accessToken)
        return api.request(originalRequest)
    }
    throw error
})
