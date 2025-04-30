import { API_BASE_URL, endpoints } from "../constants/config";
import axios from "axios";

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
        "accessToken"
    )}`;
    return config;
});

api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        const status = error?.response?.status;
        if (status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const response = await axios.get<string>(
                API_BASE_URL + endpoints.refresh,
                { withCredentials: true }
            );
            localStorage.setItem("accessToken", response.data);
            return api.request(originalRequest);
        }
        throw error;
    }
);
