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
    const [isAscending, setIsAscending] = useState<boolean>(false);
    const [allSelected, setAllSelected] = useState<boolean>(false);
    const [selectedAnswers, setSelectedAnswers] = useState<Set<number>>(
        new Set()
    );

    useEffect(() => {
        request<OwnAnswer[]>("get", endpoints.ownAnswers, true).then(
            (response) => {
                if (!(response instanceof Error)) {
                    setAnswers(response);
                }
            }
        );
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

    const selectAllAnswers = () => {
        if (allSelected) {
            setSelectedAnswers(new Set());
        } else {
            setSelectedAnswers(new Set(answers.map((a) => a.answerId)));
        }
        setAllSelected(!allSelected);
    };

    const selectAnswer = (id: number) => {
        const tempAnswers = new Set(selectedAnswers);
        if (selectedAnswers.has(id)) {
            tempAnswers.delete(id);
        } else {
            tempAnswers.add(id);
        }
        setSelectedAnswers(tempAnswers);
    };

    const onDelete = async () => {
        await request("delete", "/answer", true, {
            ids: Array.from(selectedAnswers),
        });
        const answers = await request<OwnAnswer[]>(
            "get",
            endpoints.ownAnswers,
            true
        );
        if (!(answers instanceof Error)) {
            setAnswers(answers);
        }
    };

    return {
        onSort,
        answers,
        selectAllAnswers,
        selectAnswer,
        onDelete,
        selectedAnswers,
        allSelected,
    };
};
