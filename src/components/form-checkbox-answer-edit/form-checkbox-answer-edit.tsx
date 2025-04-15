import { FC } from "react";
import { Form } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { useAppDispatch } from "../../redux/hooks";
import { changeAnswer } from "../../redux/entities/form/form-slice";

type Props = {
    isActive: boolean;
    handlerChange: () => void;
    answer: string;
    questionIndex: number;
    answerIndex: number;
};

export const FormCheckboxAnswerEdit: FC<Props> = ({
    isActive,
    handlerChange,
    answer,
    questionIndex,
    answerIndex,
}) => {
    const dispatch = useAppDispatch();
    const { language } = useLanguage();
    const words = dictionary[language].form;

    return (
        <div className="d-flex align-items-center gap-2">
            <Form.Check onChange={handlerChange} checked={isActive} />
            <Form.Control
                placeholder={words.questionAnswer}
                value={answer}
                onChange={(event) => {
                    dispatch(
                        changeAnswer({
                            questionIndex,
                            answerIndex,
                            value: event.target.value,
                        })
                    );
                }}
            />
        </div>
    );
};
