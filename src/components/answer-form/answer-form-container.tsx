import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AnswerForm } from "./answer-form";
import { useEffect } from "react";
import { getAnswers } from "../../redux/entities/answers/get-answers";
import { selectRequestStatus } from "../../redux/entities/answers/answers-slice";
import { useMessage } from "../../contexts/message-context/use-message-context";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";

export const AnswerFormContainer = () => {
    const { answerId } = useParams();
    const dispatch = useAppDispatch();
    const requestStatus = useAppSelector(selectRequestStatus);
    const navigate = useNavigate();
    const { addMessage } = useMessage();
    const { language } = useLanguage();
    const words = dictionary[language].errors;

    useEffect(() => {
        dispatch(getAnswers(Number(answerId)));
    }, [answerId, dispatch]);

    if (requestStatus === "idle" || requestStatus === "pending") {
        return null;
    }

    if (requestStatus === "rejected") {
        navigate("/");
        addMessage("danger", words.pageNotFound);
        return null;
    }

    return <AnswerForm />;
};
