import { Form } from "react-bootstrap";
import { FormCheckboxAnswerVisible } from "../form-checkbox-answer-visible/form-checkbox-answer-visible";
import { FC } from "react";
import { QuestionsType } from "../../types/form/questions-type";

type Props = {
    answers?: string[];
    type: QuestionsType;
};

export const FormAnswerVisible: FC<Props> = ({ answers, type }) => {
    return (
        <>
            {(type === "line" || type === "number") && <Form.Control />}
            {type === "paragraph" && <Form.Control as={"textarea"} />}
            {answers &&
                answers.map((a, i) => (
                    <FormCheckboxAnswerVisible answer={a} key={i} />
                ))}
        </>
    );
};
