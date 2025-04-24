import { useEffect, useState } from "react";
import { useApi } from "../../hooks/use-api";
import { endpoints } from "../../constants/config";
import { useParams } from "react-router-dom";
import { TableAnswer } from "../../types/form/table-answer";
import { sortObjects } from "../../helpers/sort-objects";

export const useAnswersTable = () => {
    const { formId } = useParams();
    const [isAscending, setIsAscending] = useState(true);
    const [answers, setAnswers] = useState<TableAnswer[]>([]);
    const request = useApi();

    const onSort = (filterName: keyof TableAnswer) => {
        const tempAnswers = [...answers];
        const sortedAnswers = sortObjects(tempAnswers, filterName, isAscending) as TableAnswer[]; 
        setAnswers(sortedAnswers);
        setIsAscending(!isAscending);
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

    return { answers, onSort };
};
