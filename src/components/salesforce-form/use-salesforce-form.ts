import { useEffect, useState } from "react";
import { useApi } from "../../hooks/use-api";
import { endpoints } from "../../constants/config";
import { AxiosError } from "axios";
import { SfAuthResponse } from "../../types/sf-auth-response";
import { SfUser } from "../../types/sf-user";
import { produce } from "immer";
import { useMessage } from "../../contexts/message-context/use-message-context";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";

export const useSalesforceForm = () => {
    const { language } = useLanguage();
    const { salesforce } = dictionary[language];
    const [isRegistered, setIsRegistered] = useState(false);
    const { addMessage } = useMessage();
    const [fields, setFields] = useState<SfUser>({
        FirstName: "",
        LastName: "",
        Email: "",
        Phone: "",
        Title: "",
    });
    const request = useApi();

    const sfRegister = async () => {
        const authLink = await request<string>(
            "get",
            endpoints.salesforceRegister,
            true
        );
        if (!(authLink instanceof AxiosError)) {
            window.location.href = authLink;
        }
    };

    useEffect(() => {
        request<SfAuthResponse>("get", endpoints.salesforce, true).then(
            (response) => {
                if (response instanceof AxiosError && response.status === 400) {
                    sfRegister();
                } else if (!(response instanceof AxiosError)) {
                    setIsRegistered(response.isRegistered);
                    if (response.isRegistered) {
                        setFields(response.data);
                    }
                }
            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [request]);

    const sfUpdate = () => {
        request("put", endpoints.salesforce, true, fields).then((response) => {
            if (!(response instanceof AxiosError)) {
                addMessage("success", salesforce.success);
            }
        });
    };

    const onChange = (field: keyof SfUser, value: string) => {
        setFields(
            produce((draft) => {
                draft[field] = value;
            })
        );
    };

    return {
        onClick: isRegistered ? sfUpdate : sfRegister,
        isRegistered,
        fields,
        onChange,
    };
};
