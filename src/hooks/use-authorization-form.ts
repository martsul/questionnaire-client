import { useNavigate } from "react-router-dom";
import { useAuthorization } from "../contexts/authorization-context/use-authorization";
import { FormEventHandler } from "react";
import { useApi } from "./use-api";
import { endpoints } from "../constants/config";
import { AuthorizationResponse } from "../types/authorization-response";

export const useAuthorizationForm = (thereIsAccount: boolean) => {
    const { addUser } = useAuthorization();
    const navigate = useNavigate();
    const request = useApi();
    const endpoint = thereIsAccount ? endpoints.signin : endpoints.signup;

    const handlerSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const result = await request<AuthorizationResponse>(
            "post",
            endpoint,
            true,
            event.currentTarget
        );
        if (!(result instanceof Error)) {
            addUser(result);
            localStorage.setItem("accessToken", result.accessToken);
            navigate("/");
        }
    };

    return { handlerSubmit };
};
