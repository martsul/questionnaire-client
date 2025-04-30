import { useNavigate } from "react-router-dom";
import { dictionary } from "../constants/dictionary";
import { useLanguage } from "../contexts/language-context/use-language";
import { getErrorData } from "../helpers/get-error-data";
import { AvailableErrors } from "../types/available-errors";
import { useLogout } from "./use-logout";

export const useHandlerError = () => {
    const { language } = useLanguage();
    const { errors } = dictionary[language];
    const navigate = useNavigate();
    const { handlerLogout } = useLogout();

    const handlerErrors = (error: unknown): string => {
        const { message, status } = getErrorData(error);
        if (status === 404 || status === 403 || status === 401) {
            navigate("/");
        }
        if (message === "User Is Blocked") {
            handlerLogout();
        }
        return message in errors
            ? errors[message as AvailableErrors]
            : errors.unknown;
    };

    return { handlerErrors };
};
