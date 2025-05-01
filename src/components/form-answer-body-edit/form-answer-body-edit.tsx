import { FC } from "react";
import { QuestionsType } from "../../types/form/questions-type";
import { Form } from "react-bootstrap";
import { FormCheckboxAnswerEdit } from "../form-checkbox-answer-edit/form-checkbox-answer-edit";

type Props = {
    type: QuestionsType;
    answers?: string[];
    selectedAnswers: Set<number>;
    handlerChange: (index: number) => void;
    index: number;
};

export const FormAnswerBodyEdit: FC<Props> = ({
    type,
    answers,
    selectedAnswers,
    handlerChange,
    index,
}) => {
    return (
        <>
            {(type === "line" || type === "number") && (
                <Form.Control readOnly={true} />
            )}
            {type === "paragraph" && (
                <Form.Control as={"textarea"} readOnly={true} />
            )}
            {answers &&
                answers.map((a, i) => (
                    <FormCheckboxAnswerEdit
                        isActive={selectedAnswers.has(i)}
                        answer={a}
                        handlerChange={() => {
                            handlerChange(i);
                        }}
                        questionIndex={index}
                        answerIndex={i}
                        key={i}
                    />
                ))}
        </>
    );
};
