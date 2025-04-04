import { api } from "../api";
import { endpoints } from "../constants/config";
import { useAuthorization } from "../contexts/authorization-context/use-authorization";
import { useLanguage } from "../contexts/language-context/use-language";
import { handlerErrors } from "../helpers/handler-errors";

export const useLogout = () => {
    const { deleteUser } = useAuthorization();
    const { language } = useLanguage();

    const handlerLogout = async () => {
        try {
            await api.post(endpoints.logout);
            localStorage.removeItem("accessToken");
            deleteUser();
        } catch (error) {
            handlerErrors(error, language);
        }
    };

    return { handlerLogout };
};
