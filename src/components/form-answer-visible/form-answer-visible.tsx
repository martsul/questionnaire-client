import { Form } from "react-bootstrap";
import { FormCheckAnswerVisible } from "../form-check-answer-visible/form-check-answer-visible";
import { FC } from "react";
import { QuestionsType } from "../../types/form/questions-type";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    selectAnswers,
    setNumAnswer,
    setTextAnswer,
} from "../../redux/entities/answers/answers-slice";

type Props = {
    answers?: string[];
    type: QuestionsType;
    id: string;
    disabled: boolean;
};

export const FormAnswerVisible: FC<Props> = ({
    answers,
    type,
    id,
    disabled,
}) => {
    const dispatch = useAppDispatch();
    const answersValues = useAppSelector(selectAnswers);

    return (
        <>
            {type === "line" && (
                <Form.Control
                    maxLength={100}
                    disabled={disabled}
                    onChange={(event) => {
                        dispatch(
                            setTextAnswer({ id, value: event.target.value })
                        );
                    }}
                    value={answersValues[id]}
                />
            )}
            {type === "number" && (
                <Form.Control
                    maxLength={100}
                    disabled={disabled}
                    onChange={(event) => {
                        dispatch(
                            setNumAnswer({ id, value: event.target.value })
                        );
                    }}
                    value={answersValues[id]}
                />
            )}
            {type === "paragraph" && (
                <Form.Control
                    maxLength={250}
                    disabled={disabled}
                    onChange={(event) => {
                        dispatch(
                            setTextAnswer({ id, value: event.target.value })
                        );
                    }}
                    value={answersValues[id]}
                    as={"textarea"}
                />
            )}
            {type === "checkbox" &&
                answers &&
                answers.map((a, i) => (
                    <FormCheckAnswerVisible
                        type={type}
                        disabled={disabled}
                        id={id}
                        answer={a}
                        key={i}
                    />
                ))}
            {type === "radio" &&
                answers &&
                answers.map((a, i) => (
                    <FormCheckAnswerVisible
                        type={type}
                        disabled={disabled}
                        id={id}
                        answer={a}
                        key={i}
                    />
                ))}
        </>
    );
};
