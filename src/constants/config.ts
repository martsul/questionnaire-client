// export const API_BASE_URL =
// "https://questionnaire-server-gajm.onrender.com/api";
export const API_BASE_URL = "http://localhost:10000/api";

// export const WS_BASE_URL =
//     "wss://questionnaire-server-gajm.onrender.com/api/comments?formId=";
export const WS_BASE_URL = "ws://localhost:10000/api/comments?formId=";

export const GITHUB_AUTH = API_BASE_URL + "/auth/github";

export const endpoints = {
    signin: `/signin`,
    signup: `/signup`,
    logout: `/logout`,
    authRequest: "/auth_request",
    users: "/users",
    block: "/block",
    unblock: "/unblock",
    deleteUsers: "/delete_users",
    giveAdmin: "/give_admin",
    takeAdmin: "/take_admin",
    refresh: "/refresh",
    form: "/form",
    tag: "/tag",
    user: "/user",
    like: "/like",
    answer: "/answer",
    answers: "/answers",
    statistic: "/statistic",
    home: "/home_page",
    ownForms: "/own_forms",
    ownAnswers: "/own_answers",
    searchForm: "/search_form",
    githubAuth: "/auth/github/tokens",
    salesforce: "/salesforce",
    salesforceRegister: "/salesforce-register",
    odooApiKey: "/odoo_api_key"
} as const;
