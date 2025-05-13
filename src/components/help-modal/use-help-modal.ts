import { useState } from "react";
import { Priority } from "../../types/priority";
import { useAuthorization } from "../../contexts/authorization-context/use-authorization";
import { useAppSelector } from "../../redux/hooks";
import { selectHead } from "../../redux/entities/form/form-slice";
import { useApi } from "../../hooks/use-api";
import { endpoints } from "../../constants/config";
import { AxiosError } from "axios";
import { useMessage } from "../../contexts/message-context/use-message-context";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";

type Values = { priority: Priority; summary: string };

export const useHelpModal = () => {
    const [values, setValues] = useState<Values>({
        priority: "low",
        summary: "",
    });
    const headData = useAppSelector(selectHead);
    const { userData } = useAuthorization();
    const link = window.location.href;
    const formTitle = link.match("form") && headData ? headData.title : "";
    const { addMessage } = useMessage();
    const request = useApi();
    const { language } = useLanguage();
    const { success } = dictionary[language];
    const requestBody = {
        reportedBy: userData ? userData.userName : "",
        priority: values.priority,
        summary: values.summary,
        formTitle,
        link,
    };

    const changePriority = (value: Priority) => {
        setValues({ ...values, priority: value });
    };

    const changeSummary = (value: string) => {
        setValues({ ...values, summary: value });
    };

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const response = await request(
            "post",
            endpoints.support,
            true,
            requestBody
        );
        if (!(response instanceof AxiosError)) {
            addMessage("success", success.appeal);
        }
    };

    return { values, changePriority, changeSummary, onSubmit };
};
