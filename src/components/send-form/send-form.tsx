import { Button, Form } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { FC } from "react";

type Props = {
    answerOnEmail: boolean;
    setAnswerOnEmail: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: () => void;
};

export const SendForm: FC<Props> = ({
    onSubmit,
    answerOnEmail,
    setAnswerOnEmail,
}) => {
    const { language } = useLanguage();
    const { form } = dictionary[language];

    return (
        <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-2">
                <Form.Check checked={answerOnEmail} onChange={() => {setAnswerOnEmail(!answerOnEmail)}} />
                <span>{form.sendOnEmail}</span>
            </div>
            <Button onClick={onSubmit}>{form.send}</Button>
        </div>
    );
};
