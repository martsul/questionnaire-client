import { api } from "../api";
import { useLanguage } from "../contexts/language-context/use-language";
import { useLoading } from "../contexts/loading-context/use-loading";
import { useMessage } from "../contexts/message-context/use-message-context";
import { handlerErrors } from "../helpers/handler-errors";
import { ApiResponse } from "../types/api-response";
import { AvailableEndpoints } from "../types/available-endpoints";
import { HttpMethods } from "../types/http-methods";
import { RequestData } from "../types/request-data";

export const useApi = () => {
    const { startLoading, stopLoading } = useLoading();
    const { language } = useLanguage();
    const { addMessage } = useMessage();

    const request = async <T>(
        method: HttpMethods,
        url: AvailableEndpoints,
        data?: RequestData
    ) => {
        try {
            startLoading();
            const response: ApiResponse<T> = await api[method](url, data);
            return response.data;
        } catch (error) {
            addMessage("error", handlerErrors(error, language));
        } finally {
            stopLoading();
        }
    };

    return request;
};
