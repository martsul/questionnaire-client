import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Form } from "./form";
import { getForm } from "../../redux/entities/forms/get-forms";
import { useNavigate, useParams } from "react-router-dom";
import {
    selectFormStatus,
    selectHead,
} from "../../redux/entities/forms/forms-slice";
import { useLoading } from "../../contexts/loading-context/use-loading";
import { useMessage } from "../../contexts/message-context/use-message-context";
import { dictionary } from "../../constants/dictionary";
import { useLanguage } from "../../contexts/language-context/use-language";
import { useAuthorization } from "../../contexts/authorization-context/use-authorization";

export const FormContainer = () => {
    const dispatch = useAppDispatch();
    const { startLoading, stopLoading } = useLoading();
    const { addMessage } = useMessage();
    const { language } = useLanguage();
    const { errors } = dictionary[language];
    const { userData } = useAuthorization();
    const headData = useAppSelector(selectHead);
    const formId = +(useParams().formId as string);
    const status = useAppSelector(selectFormStatus);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getForm({ formId, userId: userData?.id }));
    }, [dispatch, formId, userData?.id]);

    useEffect(() => {
        if (status === "pending" || status === "idle") {
            startLoading();
            return;
        }

        stopLoading();

        if (status === "rejected") {
            navigate("/");
            addMessage("danger", errors.unknown);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors.unknown, headData, navigate, status]);

    if (!headData) {
        return null;
    }

    return <Form formHead={headData} />;
};
