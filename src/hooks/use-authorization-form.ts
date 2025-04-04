import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/language-context/use-language";
import { useMessage } from "../contexts/message-context/use-message-context";
import { useAuthorization } from "../contexts/authorization-context/use-authorization";
import { handlerErrors } from "../helpers/handler-errors";
import { FormEventHandler } from "react";
import { useApi } from "./use-api";
import { ApiRequest } from "../types/api-request";
import { endpoints } from "../constants/config";
import { AuthorizationResponse } from "../types/authorization-response";

const getResult = async (target: HTMLFormElement, request: ApiRequest) => {
    const formData = new FormData(target);
    const thereIsAccount = Boolean(formData.get("name") === null);
    const url = thereIsAccount ? endpoints.signin : endpoints.signup;
    return await request<AuthorizationResponse>("post", url, formData);
};

export const useAuthorizationForm = () => {
    const { addMessage } = useMessage();
    const { language } = useLanguage();
    const { addUser } = useAuthorization();
    const navigate = useNavigate();
    const request = useApi();

    const handlerSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        try {
            event.preventDefault();
            const result = await getResult(event.target as HTMLFormElement, request);
            if (!result) return
            addUser(result);
            navigate("/");
        } catch (error) {
            addMessage("error", handlerErrors(error, language));
        }
    };

    return { handlerSubmit };
};
