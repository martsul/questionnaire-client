import { useEffect, useState } from "react";
import { useApi } from "../../hooks/use-api";
import { endpoints } from "../../constants/config";
import { useParams } from "react-router-dom";

type Answer = {
    questionId: string;
    answer: string;
    answerCount: number;
    Question: { title: string };
};

export const useStatistic = () => {
    const { formId } = useParams();
    const [answers, setAnswers] = useState<Record<string, Answer[]>>({});
    const response = useApi();

    useEffect(() => {
        response<Answer[]>("get", endpoints.statistic, true, { formId }).then(
            (result) => {
                if (!(result instanceof Error)) {
                    const tempAnswers: Record<string, Answer[]> = {};
                    result.forEach((a) => {
                        if (!tempAnswers[a.questionId]) {
                            tempAnswers[a.questionId] = [];
                        }
                        tempAnswers[a.questionId].push(a);
                    });
                    setAnswers(tempAnswers);
                }
            }
        );
    }, [formId, response]);

    return { answers };
};
