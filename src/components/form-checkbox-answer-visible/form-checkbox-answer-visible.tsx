import { Form } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { FC } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { setCheckboxAnswer } from "../../redux/entities/answers/answers-slice";

type Props = {
    answer: string;
    id: string;
};

export const FormCheckboxAnswerVisible: FC<Props> = ({ answer, id }) => {
    const { language } = useLanguage();
    const words = dictionary[language].form;
    const dispatch = useAppDispatch();

    return (
        <div className="d-flex align-items-center gap-2">
            <Form.Check
                value={answer}
                onChange={(event) =>
                    dispatch(
                        setCheckboxAnswer({
                            id,
                            value: event.target.value,
                            isAdd: event.target.checked,
                        })
                    )
                }
            />
            <span>{answer || words.noInfo}</span>
        </div>
    );
};
