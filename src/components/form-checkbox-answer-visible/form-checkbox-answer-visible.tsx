import { Form } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    selectCheckedAnswers,
    setCheckboxAnswer,
} from "../../redux/entities/answers/answers-slice";

type Props = {
    answer: string;
    id: string;
    disabled: boolean;
};

export const FormCheckboxAnswerVisible: FC<Props> = ({
    answer,
    id,
    disabled,
}) => {
    const { language } = useLanguage();
    const words = dictionary[language].form;
    const dispatch = useAppDispatch();

    const checkedAnswers = new Set(
        useAppSelector((state) => selectCheckedAnswers(state, id))
    );

    return (
        <div className="d-flex align-items-center gap-2">
            <Form.Check
                value={answer}
                checked={checkedAnswers.has(answer)}
                disabled={disabled}
                onChange={(event) => {
                    dispatch(
                        setCheckboxAnswer({
                            id,
                            value: event.target.value,
                            isAdd: event.target.checked,
                        })
                    );
                }}
            />
            <span>{answer || words.noInfo}</span>
        </div>
    );
};
