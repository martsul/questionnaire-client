import { useEffect, useState } from "react";
import { useApi } from "../../hooks/use-api";
import { endpoints } from "../../constants/config";
import { useAuthorization } from "../../contexts/authorization-context/use-authorization";
import { OwnAnswer } from "../../types/own-answer";
import { sortObjects } from "../../helpers/sort-objects";

export const useTableOwnAnswers = () => {
    const { userData } = useAuthorization();
    const [answers, setAnswers] = useState<OwnAnswer[]>([]);
    const request = useApi();
    const [isAscending, setIsAscending] = useState<boolean>(true);

    useEffect(() => {
        request<OwnAnswer[]>("get", endpoints.ownAnswers, true, {
            userId: userData?.id,
        }).then((response) => {
            if (!(response instanceof Error)) {
                setAnswers(response);
            }
        });
    }, [request, userData?.id]);

    const onSort = (sortField: keyof OwnAnswer) => {
        const tempAnswers = [...answers];
        const sortedAnswers = sortObjects(
            tempAnswers,
            sortField,
            isAscending
        ) as OwnAnswer[];
        setAnswers(sortedAnswers);
        setIsAscending(!isAscending);
    };

    return { onSort, answers };
};
