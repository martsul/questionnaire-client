import { useEffect, useState } from "react";
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
import { useAuthorization } from "../../contexts/authorization-context/use-authorization";
import { selectAnswers } from "../../redux/entities/answers/answers-slice";
import { useApi } from "../../hooks/use-api";
import { endpoints } from "../../constants/config";

export const FormContainer = () => {
    const dispatch = useAppDispatch();
    const { startLoading, stopLoading } = useLoading();
    const { addMessage } = useMessage();
    const { language } = useLanguage();
    const { errors } = dictionary[language];
    const { userData } = useAuthorization();
    const headData = useAppSelector(selectHead);
    const answers = useAppSelector(selectAnswers);
    const formId = +(useParams().formId as string);
    const status = useAppSelector(selectFormStatus);
    const navigate = useNavigate();
    const request = useApi();
    const [isEdit, setIsEdit] = useState(false);

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
    }, [
        addMessage,
        errors.unknown,
        headData,
        navigate,
        startLoading,
        status,
        stopLoading,
    ]);

    if (!headData) {
        return null;
    }

    const onSubmit = async () => {
        const requestData = {
            answers,
            formId: headData?.id,
            userId: userData?.id,
        };
        const result = await request(
            "post",
            endpoints.answer,
            true,
            requestData
        );
        if (!(result instanceof Error)) addMessage("success", "ok");
    };

    const toggleEdit = () => {
        setIsEdit(!isEdit);
        if (isEdit && headData?.id) {
            dispatch(getForm({ formId: headData.id, userId: userData?.id }));
        }
    };

    return (
        <Form
            isEdit={isEdit}
            onSubmit={onSubmit}
            toggleEdit={toggleEdit}
            formHead={headData}
        />
    );
};
