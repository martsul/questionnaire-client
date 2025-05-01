import { FC } from "react";
import { FormAnswerBodyEdit } from "../form-answer-body-edit/form-answer-body-edit";
import { FormAnswerFooter } from "../form-answer-footer/form-answer-footer";
import { QuestionsType } from "../../types/form/questions-type";
import { useFormAnswerEdit } from "./use-form-answer-edit";

type Props = {
    index: number;
    type: QuestionsType;
    answers?: string[];
};

export const FormAnswerEdit: FC<Props> = ({ index, type, answers }) => {
    const {
        selectedAnswers,
        handlerChange,
        handlerAddAnswer,
        handlerDeleteAnswer,
    } = useFormAnswerEdit(index);

    return (
        <>
            <FormAnswerBodyEdit
                selectedAnswers={selectedAnswers}
                handlerChange={handlerChange}
                type={type}
                answers={answers}
                index={index}
            />
            {(type === "checkbox" || type === "radio") && (
                <FormAnswerFooter
                    handlerAddAnswer={handlerAddAnswer}
                    handlerDeleteAnswer={handlerDeleteAnswer}
                />
            )}
        </>
    );
};
