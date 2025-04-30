import { useCallback } from "react";
import { api } from "../api";
import { useLoading } from "../contexts/loading-context/use-loading";
import { useMessage } from "../contexts/message-context/use-message-context";
import { ApiResponse } from "../types/api-response";
import { AvailableEndpoints } from "../types/available-endpoints";
import { HttpMethods } from "../types/http-methods";
import { RequestData } from "../types/request-data";
import { useHandlerError } from "./use-handler-error";
import { AxiosError } from "axios";

const convertData = (method: HttpMethods, data?: RequestData) => {
    if (method === "get") {
        return { params: data };
    } else if (method === "delete") {
        return { data };
    }
    return data;
};

export const useApi = () => {
    const { startLoading, stopLoading } = useLoading();
    const { addMessage } = useMessage();
    const { handlerErrors } = useHandlerError();

    const request = useCallback(
        async <T>(
            method: HttpMethods,
            url: AvailableEndpoints,
            needMessage: boolean,
            data?: RequestData
        ): Promise<T | AxiosError> => {
            try {
                startLoading();
                const convertedData = convertData(method, data);
                const response: ApiResponse<T> = await api[method](
                    url,
                    convertedData
                );
                return response.data;
            } catch (error) {
                if (needMessage) addMessage("danger", handlerErrors(error));
                console.error(error);
                return error as AxiosError;
            } finally {
                stopLoading();
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [addMessage, startLoading, stopLoading]
    );

    return request;
};
