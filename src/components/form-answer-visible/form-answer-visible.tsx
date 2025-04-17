import { Form } from "react-bootstrap";
import { FormCheckboxAnswerVisible } from "../form-checkbox-answer-visible/form-checkbox-answer-visible";
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
};

export const FormAnswerVisible: FC<Props> = ({ answers, type, id }) => {
    const dispatch = useAppDispatch();
    const answersValues = useAppSelector(selectAnswers);

    return (
        <>
            {type === "line" && (
                <Form.Control
                    maxLength={100}
                    onChange={(event) =>
                        dispatch(
                            setTextAnswer({ id, value: event.target.value })
                        )
                    }
                    value={answersValues[id]}
                />
            )}
            {type === "number" && (
                <Form.Control
                    maxLength={100}
                    onChange={(event) =>
                        dispatch(
                            setNumAnswer({ id, value: event.target.value })
                        )
                    }
                    value={answersValues[id]}
                />
            )}
            {type === "paragraph" && (
                <Form.Control
                    maxLength={250}
                    onChange={(event) =>
                        dispatch(
                            setTextAnswer({ id, value: event.target.value })
                        )
                    }
                    value={answersValues[id]}
                    as={"textarea"}
                />
            )}
            {answers &&
                answers.map((a, i) => (
                    <FormCheckboxAnswerVisible id={id} answer={a} key={i} />
                ))}
        </>
    );
};
