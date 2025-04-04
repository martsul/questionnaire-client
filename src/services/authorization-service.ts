import { AxiosResponse } from "axios";
import { AuthorizationResponse } from "../types/authorization-response";
import { api } from "../api";
import { endpoints } from "../constants/config";

export const authorizationService = async (
    thereIsAccount: boolean,
    formData: FormData
): Promise<AxiosResponse<AuthorizationResponse>> => {
    const url = thereIsAccount ? endpoints.signin : endpoints.signup;
    const result = await api.post<AuthorizationResponse>(url, formData);
    return result
};
