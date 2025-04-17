// export const API_BASE_URL =
//     "https://questionnaire-server-cwqc.onrender.com/api";
export const API_BASE_URL = "http://localhost:10000/api";

// export const WS_BASE_URL =
//     "wss://questionnaire-server-cwqc.onrender.com/api/comments?formId=";
export const WS_BASE_URL = "ws://localhost:10000/api/comments?formId=";

export const endpoints = {
    signin: `/signin`,
    signup: `/signup`,
    logout: `/logout`,
    authRequest: "/auth_request",
    users: "/users",
    block: "/block",
    unblock: "/unblock",
    giveAdmin: "/give_admin",
    takeAdmin: "/take_admin",
    refresh: "/refresh",
    form: "/form",
    tag: "/tag",
    theme: "/theme",
    user: "/user",
    like: "/like",
    answer: "/answer",
    answers: "/answers",
    statistic: "/statistic",
} as const;
