import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/language-context/use-language";
import { useMessage } from "../contexts/message-context/use-message-context";
import { authorizationService } from "../services/authorization-service";
import { useAuthorization } from "../contexts/authorization-context/use-authorization";
import { handlerErrors } from "../helpers/handler-errors";
import { FormEventHandler } from "react";

const getResult = async (target: HTMLFormElement) => {
    const formData = new FormData(target);
    const thereIsAccount = Boolean(formData.get("name") === null);
    return await authorizationService(thereIsAccount, formData);
};

export const useAuthorizationForm = () => {
    const { addMessage } = useMessage();
    const { language } = useLanguage();
    const { addUser } = useAuthorization();
    const navigate = useNavigate();

    const handlerSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        try {
            event.preventDefault();
            const result = await getResult(event.target as HTMLFormElement);
            addUser(result.data);
            navigate("/");
        } catch (error) {
            addMessage("error", handlerErrors(error, language));
        }
    };

    return { handlerSubmit };
};
