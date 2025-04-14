import { FC, useState } from "react";
import { FormAnswerBody } from "../form-answer-body/form-answer-body";
import { FormAnswerFooter } from "../form-answer-footer/form-answer-footer";
import { QuestionsType } from "../../types/form/questions-type";
import { produce } from "immer";
import { useAppDispatch } from "../../redux/hooks";
import { addAnswer, deleteAnswer } from "../../redux/entities/form/form-slice";

type Props = {
    index: number;
    isPreview: boolean;
    type: QuestionsType;
    answers?: string[];
};

export const FormAnswer: FC<Props> = ({ index, isPreview, type, answers }) => {
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

    return (
        <>
            <FormAnswerBody
                selectedAnswers={selectedAnswers}
                handlerChange={handlerChange}
                type={type}
                answers={answers}
                isPreview={isPreview}
                index={index}
            />
            {!isPreview && type === "checkbox" && (
                <FormAnswerFooter
                    handlerAddAnswer={handlerAddAnswer}
                    handlerDeleteAnswer={handlerDeleteAnswer}
                />
            )}
        </>
    );
};
