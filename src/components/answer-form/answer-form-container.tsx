import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AnswerForm } from "./answer-form";
import { useEffect } from "react";
import { getAnswers } from "../../redux/entities/answers/get-answers";
import {
    selectAnswers,
    selectRequestStatus,
    selectUser,
} from "../../redux/entities/answers/answers-slice";
import { useMessage } from "../../contexts/message-context/use-message-context";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { PageTitle } from "../page-title/page-title";
import { useAuthorization } from "../../contexts/authorization-context/use-authorization";
import { useApi } from "../../hooks/use-api";
import { endpoints } from "../../constants/config";
import { useLoading } from "../../contexts/loading-context/use-loading";

export const AnswerFormContainer = () => {
    const { answerId } = useParams();
    const dispatch = useAppDispatch();
    const requestStatus = useAppSelector(selectRequestStatus);
    const navigate = useNavigate();
    const { addMessage } = useMessage();
    const { language } = useLanguage();
    const { errors, titles } = dictionary[language];
    const answerOwner = useAppSelector(selectUser);
    const { userData } = useAuthorization();
    const request = useApi();
    const answers = useAppSelector(selectAnswers);
    const { startLoading, stopLoading } = useLoading();
    const canRedact = Boolean(
        answerOwner.id === userData?.id || userData?.isAdmin
    );

    useEffect(() => {
        dispatch(getAnswers(Number(answerId)));
    }, [answerId, dispatch]);

    useEffect(() => {
        if (requestStatus === "fulfilled") {
            stopLoading();
        }
    }, [requestStatus, stopLoading]);

    if (requestStatus === "idle" || requestStatus === "pending") {
        startLoading();
        return null;
    }

    if (requestStatus === "rejected") {
        navigate("/");
        addMessage("danger", errors.pageNotFound);
        return null;
    }

    const onSubmit = async () => {
        await request("put", endpoints.answer, true, { answerId, answers });
        dispatch(getAnswers(Number(answerId)));
    };

    const onDelete = async () => {
        const result = await request("delete", endpoints.answer, true, { ids: [answerId] });
        if (result) {
            navigate("/")
        }
    };

    return (
        <>
            <PageTitle title={titles.answer} />
            <AnswerForm onDelete={onDelete} onSubmit={onSubmit} canRedact={canRedact} />
        </>
    );
};
