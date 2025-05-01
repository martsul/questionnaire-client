import { useNavigate } from "react-router-dom";
import { endpoints } from "../constants/config";
import { useAuthorization } from "../contexts/authorization-context/use-authorization";
import { api } from "../api";
import { useLoading } from "../contexts/loading-context/use-loading";

export const useLogout = () => {
    const { deleteUser } = useAuthorization();
    const navigate = useNavigate();
    const { startLoading, stopLoading } = useLoading();

    const handlerLogout = async () => {
        startLoading()
        await api.post(endpoints.logout);
        stopLoading()
        localStorage.removeItem("accessToken");
        navigate("/");
        deleteUser();
    };

    return { handlerLogout };
};
