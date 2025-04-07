import { InputGroup } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { Form } from "react-bootstrap";
import { ChangeEventHandler, FC } from "react";

type Props = { handlerChange: ChangeEventHandler<HTMLInputElement> };

export const InputSearch: FC<Props> = ({ handlerChange }) => {
    const { language } = useLanguage();
    const words = dictionary[language].header;

    return (
        <InputGroup>
            <InputGroup.Text>
                <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control onChange={handlerChange} placeholder={words.search} />
        </InputGroup>
    );
};
