import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { produce } from "immer";
import {
    addAnswer,
    deleteAnswer,
} from "../../redux/entities/forms/forms-slice";

export const useFormAnswerEdit = (index: number) => {
    const dispatch = useAppDispatch();
    const [selectedAnswers, setSelectedAnswers] = useState<Set<number>>(
        new Set()
    );

    const handlerChange = (index: number) => {
        setSelectedAnswers(
            produce((draft) => {
                if (selectedAnswers.has(index)) {
                    draft.delete(index);
                } else {
                    draft.add(index);
                }
            })
        );
    };

    const handlerAddAnswer = () => {
        dispatch(addAnswer(index));
    };

    const handlerDeleteAnswer = () => {
        dispatch(
            deleteAnswer({
                index,
                deleteAnswer: Array.from(selectedAnswers),
            })
        );
        setSelectedAnswers(new Set());
    };
    return {
        handlerChange,
        handlerAddAnswer,
        handlerDeleteAnswer,
        selectedAnswers,
    };
};
