import { Link, Outlet } from "react-router-dom";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { PageTitle } from "../page-title/page-title";
import { ProfileNav } from "../profile-nav/profile-nav";
import { ApiInput } from "../api-input/api-input";
import { useState } from "react";
import { useApi } from "../../hooks/use-api";
import { endpoints } from "../../constants/config";
import { AxiosError } from "axios";

export const ProfileLayout = () => {
    const [apiKey, setApiKey] = useState("");
    const { language } = useLanguage();
    const { titles } = dictionary[language];
    const request = useApi();

    const getApiKey = async () => {
        const response = await request<string>(
            "get",
            endpoints.odooApiKey,
            true
        );
        if (!(response instanceof AxiosError)) {
            setApiKey(response);
        }
    };

    return (
        <>
            <PageTitle title={titles.profile} />
            <section>
                <div className="d-flex flex-column gap-3">
                    <ApiInput getApiKey={getApiKey} value={apiKey} />
                    <Link className="btn btn-primary" to="/salesforce">
                        Salesforce
                    </Link>
                    <ProfileNav />
                </div>
                <Outlet />
            </section>
        </>
    );
};
