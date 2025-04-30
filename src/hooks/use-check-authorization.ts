import { endpoints } from "../constants/config";
import { useAuthorization } from "../contexts/authorization-context/use-authorization";
import { AuthorizationResponse } from "../types/authorization-response";
import { useLoading } from "../contexts/loading-context/use-loading";
import { useApi } from "./use-api";
import { AxiosError } from "axios";

const getResult = async (request: ReturnType<typeof useApi>) => {
    const result = await request<Omit<AuthorizationResponse, "accessToken">>(
        "get",
        endpoints.authRequest,
        false
    );
    return result;
};

export const useCheckAuthorization = () => {
    const { addUser } = useAuthorization();
    const { startLoading, stopLoading } = useLoading();
    const accessToken = localStorage.getItem("accessToken");
    const request = useApi();

    const checkAuthorization = async () => {
        if (!accessToken) return;
        startLoading();
        const result = await getResult(request);
        if (result instanceof AxiosError) {
            const status = result.response?.status;
            if (status === 401 || status === 403 || status === 404) {
                localStorage.removeItem("accessToken");
            }
        } else {
            addUser(result);
        }
        stopLoading();
    };

    return { checkAuthorization };
};
