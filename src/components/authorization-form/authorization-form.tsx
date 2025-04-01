import { FC } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthorizationForm } from "../../hooks/use-authorization-form";
import styles from "./authorization-form.module.css";
import { useTheme } from "../../contexts/theme-context/use-theme";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";

type Props = { thereIsAccount: boolean };

export const AuthorizationForm: FC<Props> = ({ thereIsAccount }) => {
    const { handlerChangeValue, formParameters, handlerSubmit } =
        useAuthorizationForm();
    const { theme } = useTheme();
    const { language } = useLanguage();
    const words = dictionary[language].authorization;

    return (
        <Form
            onSubmit={handlerSubmit}
            className="d-flex flex-column align-items-center w-100 gap-5"
        >
            <h1>{thereIsAccount ? words.login : words.signUp}</h1>
            <div className={`d-flex flex-column gap-2 w-100 ${styles.inputs}`}>
                <Form.Group className="w-100">
                    <Form.Label>{words.email}</Form.Label>
                    <Form.Control
                        required
                        name="email"
                        onChange={handlerChangeValue}
                        type="email"
                        placeholder={words.enterEmail}
                        value={formParameters.email}
                    />
                </Form.Group>
                {!thereIsAccount && (
                    <Form.Group className="w-100">
                        <Form.Label>{words.name}</Form.Label>
                        <Form.Control
                            required
                            name="name"
                            onChange={handlerChangeValue}
                            type="text"
                            placeholder={words.enterName}
                            value={formParameters.name}
                        />
                    </Form.Group>
                )}
                <Form.Group className="w-100">
                    <Form.Label>{words.password}</Form.Label>
                    <Form.Control
                        required
                        name="password"
                        onChange={handlerChangeValue}
                        type="password"
                        value={formParameters.password}
                    />
                </Form.Group>
            </div>
            {thereIsAccount && (
                <div>
                    <span>{words.noAccount}? </span>
                    <Link to="/signup">{words.signUp}</Link>
                </div>
            )}
            <Button
                type="submit"
                variant={
                    theme === "dark" ? "outline-light" : "outline-secondary"
                }
            >
                {words.submit}
            </Button>
        </Form>
    );
};
