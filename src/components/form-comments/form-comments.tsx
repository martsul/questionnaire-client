import { Button, Form } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { FormComment } from "../form-comment/form-comment";

export const FormComments = () => {
    const { language } = useLanguage();
    const words = dictionary[language].form;

    return (
        <div className="mb-5">
            <h2>{words.commentsTitle}</h2>
            <div className="d-flex flex-column gap-2 align-items-end mb-5">
                <Form.Control placeholder={words.commentsInput} as="textarea" />
                <Button>{words.send}</Button>
            </div>
            <div className="d-flex flex-column gap-3">
                <FormComment />
            </div>
        </div>
    );
};
