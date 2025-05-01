import { FC, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useTheme } from "../../contexts/theme-context/use-theme";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { useAuthorizationForm } from "../../hooks/use-authorization-form";
import { useAuthorization } from "../../contexts/authorization-context/use-authorization";
import { PageTitle } from "../page-title/page-title";
import { AuthorizationsFormInputs } from "../authorization-form-inputs/authorization-form-inputs";
import { AuthorizationNetworks } from "../authorization-networks/authorization-networks";

type Props = { thereIsAccount: boolean };

export const AuthorizationForm: FC<Props> = ({ thereIsAccount }) => {
    const { handlerSubmit } = useAuthorizationForm(thereIsAccount);
    const { theme } = useTheme();
    const { language } = useLanguage();
    const { authorization, titles } = dictionary[language];
    const { userData } = useAuthorization();
    const navigate = useNavigate();

    useEffect(() => {
        if (userData) {
            navigate("/");
        }
    }, [userData, navigate]);

    return (
        <>
            <PageTitle title={thereIsAccount ? titles.login : titles.signup} />
            <Form
                onSubmit={handlerSubmit}
                className="d-flex flex-column align-items-center w-100 gap-5 mt-5"
            >
                <h1>
                    {thereIsAccount
                        ? authorization.login
                        : authorization.signUp}
                </h1>
                <AuthorizationsFormInputs thereIsAccount={thereIsAccount} />
                {thereIsAccount && (
                    <div>
                        <span>{authorization.noAccount}? </span>
                        <Link to="/signup">{authorization.signUp}</Link>
                    </div>
                )}
                <AuthorizationNetworks />
                <Button
                    type="submit"
                    variant={
                        theme === "dark" ? "outline-light" : "outline-secondary"
                    }
                >
                    {authorization.submit}
                </Button>
            </Form>
        </>
    );
};
