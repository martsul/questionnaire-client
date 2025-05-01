import { Form } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    selectCheckedAnswers,
    setCheckboxAnswer,
    setRadioAnswer,
} from "../../redux/entities/answers/answers-slice";

type Props = {
    answer: string;
    id: string;
    disabled: boolean;
    type: "checkbox" | "radio";
};

export const FormCheckAnswerVisible: FC<Props> = ({
    answer,
    id,
    disabled,
    type,
}) => {
    const { language } = useLanguage();
    const words = dictionary[language].form;
    const dispatch = useAppDispatch();
    const checkedAnswers = useAppSelector((state) =>
        selectCheckedAnswers(state, id)
    );

    const isChecked = Array.isArray(checkedAnswers)
        ? new Set(checkedAnswers).has(answer)
        : checkedAnswers === answer;

    const setAnswer = type === "checkbox" ? setCheckboxAnswer : setRadioAnswer;

    return (
        <div className="d-flex align-items-center gap-2">
            <Form.Check
                value={answer}
                checked={isChecked}
                disabled={disabled}
                onChange={(event) => {
                    dispatch(
                        setAnswer({
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
