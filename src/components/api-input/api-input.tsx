import { Form, InputGroup } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { FC } from "react";

type Props = {
    value: string;
    getApiKey: () => void;
};

export const ApiInput: FC<Props> = ({ getApiKey, value }) => {
    const { language } = useLanguage();
    const { other } = dictionary[language];

    const onCopy = () => {
        navigator.clipboard.writeText(value)
    }

    return (
        <InputGroup className="mb-3">
            <InputGroup.Text>
                <button onClick={getApiKey}>{other.generateApi}</button>
            </InputGroup.Text>
            <Form.Control value={value} disabled={true} />
            <InputGroup.Text>
                <button onClick={onCopy}>
                    <i className="bi bi-copy"></i>
                </button>
            </InputGroup.Text>
        </InputGroup>
    );
};
