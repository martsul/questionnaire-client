import { Form } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { FC } from "react";

type Props = {
    answer: string;
};

export const FormCheckboxAnswerVisible: FC<Props> = ({answer}) => {
    const { language } = useLanguage();
    const words = dictionary[language].form;

    return (
        <div className="d-flex align-items-center gap-2">
            <Form.Check />
            <span>{answer || words.noInfo}</span>
        </div>
    );
};
