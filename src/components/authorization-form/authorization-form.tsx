import { FC, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./authorization-form.module.css";
import { useTheme } from "../../contexts/theme-context/use-theme";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { useAuthorizationForm } from "../../hooks/use-authorization-form";
import { useAuthorization } from "../../contexts/authorization-context/use-authorization";

type Props = { thereIsAccount: boolean };

export const AuthorizationForm: FC<Props> = ({ thereIsAccount }) => {
    const { handlerSubmit } = useAuthorizationForm();
    const { theme } = useTheme();
    const { language } = useLanguage();
    const words = dictionary[language].authorization;
    const {userData} = useAuthorization()
    const navigate = useNavigate()

    useEffect(() => {
        if (userData) {
            navigate("/")
        }
    }, [userData, navigate])

    return (
        <Form
            onSubmit={handlerSubmit}
            className="d-flex flex-column align-items-center w-100 gap-5 mt-5"
        >
            <h1>{thereIsAccount ? words.login : words.signUp}</h1>
            <div className={`d-flex flex-column gap-2 w-100 ${styles.inputs}`}>
                {!thereIsAccount && (
                    <Form.Group className="w-100">
                        <Form.Label>{words.name}</Form.Label>
                        <Form.Control
                            name="name"
                            type="text"
                            placeholder={words.enterName}
                        />
                    </Form.Group>
                )}
                <Form.Group className="w-100">
                    <Form.Label>{words.email}</Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        placeholder={words.enterEmail}
                    />
                </Form.Group>
                <Form.Group className="w-100">
                    <Form.Label>{words.password}</Form.Label>
                    <Form.Control
                        placeholder={words.enterPassword}
                        name="password"
                        type="password"
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
