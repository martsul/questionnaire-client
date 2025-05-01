import { useNavigate, useParams } from "react-router-dom";
import { useLoading } from "../../contexts/loading-context/use-loading";
import { Loader } from "../loader/loader";
import { useApi } from "../../hooks/use-api";
import { useEffect } from "react";
import { endpoints } from "../../constants/config";
import { AxiosError } from "axios";

export const GithubAuth = () => {
    const { startLoading, stopLoading } = useLoading();
    const { token } = useParams();
    const request = useApi();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            startLoading();
            const response = await request<string>(
                "get",
                endpoints.githubAuth,
                false,
                {
                    token,
                }
            );
            stopLoading();
            if (!(response instanceof AxiosError)) {
                localStorage.setItem("accessToken", response);
            }
            navigate("/");
        })();
    }, [navigate, request, startLoading, stopLoading, token]);

    return <Loader />;
};
