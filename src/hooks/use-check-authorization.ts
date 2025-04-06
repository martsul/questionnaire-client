import { endpoints } from "../constants/config";
import { useAuthorization } from "../contexts/authorization-context/use-authorization";
import { ApiResponse } from "../types/api-response";
import { AuthorizationResponse } from "../types/authorization-response";
import { api } from "../api";
import { useLoading } from "../contexts/loading-context/use-loading";

const request = async () => {
    return await api.get(endpoints.authRequest);
};

export const useCheckAuthorization = () => {
    const { addUser } = useAuthorization();
    const { startLoading, stopLoading } = useLoading();
    const accessToken = localStorage.getItem("accessToken");
    const { userData } = useAuthorization();

    const checkAuthorization = async () => {
        if (!accessToken || userData) return;
        try {
            startLoading();
            const result: ApiResponse<AuthorizationResponse> = await request();
            addUser(result.data);
        } catch (error) {
            console.log(error);
            localStorage.removeItem("accessToken");
        } finally {
            stopLoading();
        }
    };

    return { checkAuthorization };
};
