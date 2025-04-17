import { useEffect, useState } from "react";
import { useApi } from "../../hooks/use-api";
import { endpoints } from "../../constants/config";
import { useParams } from "react-router-dom";
import { TableAnswer } from "../../types/form/table-answer";

export const useAnswersTable = () => {
    const { formId } = useParams();
    const [isASC, setIsASC] = useState(true);
    const [answers, setAnswers] = useState<TableAnswer[]>([]);
    const request = useApi();

    const toggleASC = (filterName: keyof TableAnswer) => {
        const tempAnswers = answers.sort((a, b) => {
            return isASC
                ? +(a[filterName] < b[filterName])
                : +(a[filterName] > b[filterName]);
        });
        setAnswers(tempAnswers);
        setIsASC(!isASC);
    };

    useEffect(() => {
        request<TableAnswer[]>("get", endpoints.answers, true, { formId }).then(
            (response) => {
                if (!(response instanceof Error)) {
                    setAnswers(response);
                }
            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formId]);

    return { answers, toggleASC };
};
