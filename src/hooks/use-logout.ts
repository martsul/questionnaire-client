import { useNavigate } from "react-router-dom";
import { endpoints } from "../constants/config";
import { useAuthorization } from "../contexts/authorization-context/use-authorization";
import { api } from "../api";

export const useLogout = () => {
    const { deleteUser } = useAuthorization();
    const navigate = useNavigate();

    const handlerLogout = async () => {
        await api.post(endpoints.logout);
        localStorage.removeItem("accessToken");
        navigate("/");
        deleteUser();
    };

    return { handlerLogout };
};
