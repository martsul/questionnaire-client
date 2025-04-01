import { Container } from "react-bootstrap";
import { AuthorizationForm } from "../components/authorization-form/authorization-form";
import { FC } from "react";

type Props = { thereIsAccount: boolean };

export const AuthorizationPage: FC<Props> = ({ thereIsAccount }) => {
    return (
        <Container className="d-flex justify-content-center mt-5">
            <AuthorizationForm thereIsAccount={thereIsAccount} />
        </Container>
    );
};
