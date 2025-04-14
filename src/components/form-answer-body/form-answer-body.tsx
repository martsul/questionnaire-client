import { FC } from "react";
import { QuestionsType } from "../../types/form/questions-type";
import { Form } from "react-bootstrap";
import { FormCheckboxAnswer } from "../form-checkbox-answer/form-checkbox-answer";
import { useFormContext } from "../../contexts/form-context/use-form-context";

type Props = {
    type: QuestionsType;
    answers?: string[];
    selectedAnswers: Set<number>;
    handlerChange: (index: number) => void;
    isPreview: boolean;
    index: number;
};

export const FormAnswerBody: FC<Props> = ({
    type,
    answers,
    selectedAnswers,
    handlerChange,
    isPreview,
    index
}) => {
    const { isEdit } = useFormContext();

    return (
        <>
            {(type === "line" || type === "number") && (
                <Form.Control readOnly={isEdit} />
            )}
            {type === "paragraph" && (
                <Form.Control as={"textarea"} readOnly={isEdit} />
            )}
            {answers &&
                answers.map((a, i) => (
                    <FormCheckboxAnswer
                        isActive={selectedAnswers.has(i)}
                        answer={a}
                        isPreview={isPreview}
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
