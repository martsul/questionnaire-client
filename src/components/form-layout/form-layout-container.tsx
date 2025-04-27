import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getForm } from "../../redux/entities/form/get-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthorization } from "../../contexts/authorization-context/use-authorization";
import { selectFormStatus } from "../../redux/entities/form/form-slice";
import { useLoading } from "../../contexts/loading-context/use-loading";
import { useMessage } from "../../contexts/message-context/use-message-context";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { FormLayout } from "./form-layout";

export const FormLayoutContainer = () => {
    const dispatch = useAppDispatch();
    const formId = +(useParams().formId as string);
    const { userData } = useAuthorization();
    const requestStatus = useAppSelector(selectFormStatus);
    const { startLoading, stopLoading } = useLoading();
    const navigate = useNavigate();
    const { addMessage } = useMessage();
    const { language } = useLanguage();
    const { errors } = dictionary[language];

    useEffect(() => {
        dispatch(getForm({ formId, userId: userData?.id }));
    }, [dispatch, formId, userData?.id]);

    useEffect(() => {
        if (requestStatus === "fulfilled") {
            stopLoading();
        }
    }, [requestStatus, stopLoading]);

    if (requestStatus === "pending" || requestStatus === "idle") {
        startLoading();
        return null;
    }

    if (requestStatus === "rejected") {
        navigate("/");
        addMessage("danger", errors.unknown);
        return null;
    }

    return <FormLayout />;
};
