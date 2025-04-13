import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Form } from "./form";
import { getForm } from "../../redux/entities/form/get-form";
import { useNavigate, useParams } from "react-router-dom";
import {
    selectFormStatus,
    selectHead,
} from "../../redux/entities/form/form-slice";
import { useLoading } from "../../contexts/loading-context/use-loading";
import { useMessage } from "../../contexts/message-context/use-message-context";
import { dictionary } from "../../constants/dictionary";
import { useLanguage } from "../../contexts/language-context/use-language";

export const FormContainer = () => {
    const dispatch = useAppDispatch();
    const formId = +(useParams().formId as string);
    const status = useAppSelector(selectFormStatus);
    const { startLoading, stopLoading } = useLoading();
    const { addMessage } = useMessage();
    const { language } = useLanguage();
    const { errors } = dictionary[language];
    const navigate = useNavigate();
    const formHead = useAppSelector(selectHead);

    useEffect(() => {
        dispatch(getForm(formId));
    }, [dispatch, formId]);

    useEffect(() => {
        if (status === "pending" || status === "idle") {
            startLoading();
            return
        }

        stopLoading();

        if (status === "rejected") {
            navigate("/");
            addMessage("danger", errors.unknown);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors.unknown, formHead, navigate, status]);

    if (!formHead) {
        return null;
    }

    return <Form formHead={formHead} />;
};
