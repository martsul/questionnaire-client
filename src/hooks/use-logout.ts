import { endpoints } from "../constants/config";
import { useAuthorization } from "../contexts/authorization-context/use-authorization";
import { useLanguage } from "../contexts/language-context/use-language";
import { handlerErrors } from "../helpers/handler-errors";
import { useApi } from "./use-api";

export const useLogout = () => {
    const { deleteUser } = useAuthorization();
    const { language } = useLanguage();
    const request = useApi();

    const handlerLogout = async () => {
        try {
            await request("post", endpoints.logout, true);
            localStorage.removeItem("accessToken");
            deleteUser();
        } catch (error) {
            handlerErrors(error, language);
        }
    };

    return { handlerLogout };
};
