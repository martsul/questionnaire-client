import { InputGroup } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { Form } from "react-bootstrap";
import { FC } from "react";

type Props = {
    value?: string;
    onChange?: (value: string) => void;
};

export const InputSearch: FC<Props> = ({ value, onChange }) => {
    const { language } = useLanguage();
    const words = dictionary[language].header;

    return (
        <InputGroup>
            <InputGroup.Text>
                <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
                onChange={(event) => {
                    if (onChange) {
                        onChange(event.target.value);
                    }
                }}
                value={value}
                placeholder={words.search}
            />
        </InputGroup>
    );
};
