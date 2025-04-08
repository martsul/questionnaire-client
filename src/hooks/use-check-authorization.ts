import { endpoints } from "../constants/config";
import { useAuthorization } from "../contexts/authorization-context/use-authorization";
import { AuthorizationResponse } from "../types/authorization-response";
import { useLoading } from "../contexts/loading-context/use-loading";
import { useApi } from "./use-api";

const getResult = async (request: ReturnType<typeof useApi>) => {
    const result = await request<
        Omit<AuthorizationResponse, "accessToken" | "refreshToken">
    >("get", endpoints.authRequest, false);
    if (!result) {
        throw new Error("Unauthorized");
    }
    return result;
};

export const useCheckAuthorization = () => {
    const { addUser } = useAuthorization();
    const { startLoading, stopLoading } = useLoading();
    const accessToken = localStorage.getItem("accessToken");
    const request = useApi();

    const checkAuthorization = async () => {
        if (!accessToken) return;
        try {
            startLoading();
            const result = await getResult(request);
            addUser(result);
        } catch (error) {
            console.log(error);
            localStorage.removeItem("accessToken");
        } finally {
            stopLoading();
        }
    };

    return { checkAuthorization };
};
