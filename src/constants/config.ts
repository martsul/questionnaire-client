// export const API_BASE_URL =
//     "https://questionnaire-server-cwqc.onrender.com/api";
export const API_BASE_URL = "http://localhost:10000/api";

export const endpoints = {
    signin: `/signin`,
    signup: `/signup`,
    logout: `/logout`,
    authRequest: "/auth_request"
} as const;
