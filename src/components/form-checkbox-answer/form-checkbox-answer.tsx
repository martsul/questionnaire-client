import { FC } from "react";
import { Form } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { useFormContext } from "../../contexts/form-context/use-form-context";
import { useAppDispatch } from "../../redux/hooks";
import { changeAnswer } from "../../redux/entities/form/form-slice";

type Props = {
    isActive: boolean;
    handlerChange: () => void;
    isPreview: boolean;
    answer: string;
    questionIndex: number;
    answerIndex: number;
};

export const FormCheckboxAnswer: FC<Props> = ({
    isActive,
    handlerChange,
    isPreview,
    answer,
    questionIndex,
    answerIndex,
}) => {
    const dispatch = useAppDispatch();
    const { language } = useLanguage();
    const words = dictionary[language].form;
    const { isEdit } = useFormContext();

    return (
        <div className="d-flex align-items-center gap-2">
            <Form.Check
                readOnly={isEdit}
                onChange={handlerChange}
                checked={isActive}
            />
            {isPreview && <span>{answer || words.noInfo}</span>}
            {!isPreview && (
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
            )}
        </div>
    );
};
