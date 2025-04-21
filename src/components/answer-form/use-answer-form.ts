import { useParams } from "react-router-dom";
import { simpleApi } from "../../api";
import { endpoints } from "../../constants/config";
import { ApiResponse } from "../../types/api-response";
import { GetAnswerResponse } from "../../types/form/get-answer-response";
import { useEffect, useState } from "react";

export const useAnswerForm = () => {
    const { answerId } = useParams();
    const [answers, setAnswers] = useState<GetAnswerResponse | null>(null);

    useEffect(() => {

    }, [answerId]);

    return {answers}
};
