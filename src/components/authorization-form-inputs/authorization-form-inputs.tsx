import { FC } from "react";
import styles from "./authorization-form-inputs.module.css";
import { Form } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";

type Props = { thereIsAccount: boolean };

export const AuthorizationsFormInputs: FC<Props> = ({ thereIsAccount }) => {
    const { language } = useLanguage();
    const { authorization } = dictionary[language];

    return (
        <div className={`d-flex flex-column gap-2 w-100 ${styles.inputs}`}>
            {!thereIsAccount && (
                <Form.Group className="w-100">
                    <Form.Label>{authorization.name}</Form.Label>
                    <Form.Control
                        name="name"
                        type="text"
                        placeholder={authorization.enterName}
                    />
                </Form.Group>
            )}
            <Form.Group className="w-100">
                <Form.Label>{authorization.email}</Form.Label>
                <Form.Control
                    name="email"
                    type="email"
                    placeholder={authorization.enterEmail}
                />
            </Form.Group>
            <Form.Group className="w-100">
                <Form.Label>{authorization.password}</Form.Label>
                <Form.Control
                    placeholder={authorization.enterPassword}
                    name="password"
                    type="password"
                />
            </Form.Group>
        </div>
    );
};
