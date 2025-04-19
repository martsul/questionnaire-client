import { api } from "../api";
import { useLanguage } from "../contexts/language-context/use-language";
import { useLoading } from "../contexts/loading-context/use-loading";
import { useMessage } from "../contexts/message-context/use-message-context";
import { handlerErrors } from "../helpers/handler-errors";
import { ApiResponse } from "../types/api-response";
import { AvailableEndpoints } from "../types/available-endpoints";
import { HttpMethods } from "../types/http-methods";
import { RequestData } from "../types/request-data";

const convertData = (method: HttpMethods, data?: RequestData) => {
    if (method === "get") {
        return { params: data };
    }
    return data;
};

export const useApi = () => {
    const { startLoading, stopLoading } = useLoading();
    const { language } = useLanguage();
    const { addMessage } = useMessage();

    const request = async <T>(
        method: HttpMethods,
        url: AvailableEndpoints,
        needMessage: boolean,
        data?: RequestData
    ): Promise<T | Error> => {
        try {
            startLoading();
            const convertedData = convertData(method, data);
            const response: ApiResponse<T> = await api[method](
                url,
                convertedData
            );
            return response.data;
        } catch (error) {
            console.log(error);
            if (needMessage) {
                addMessage("danger", handlerErrors(error, language));
            }
            return error as Error;
        } finally {
            stopLoading();
        }
    };

    return request;
};
