import { AuthorizationForm } from "../components/authorization-form/authorization-form";
import { FC } from "react";

type Props = { thereIsAccount: boolean };

export const AuthorizationPage: FC<Props> = ({ thereIsAccount }) => {
    return <AuthorizationForm thereIsAccount={thereIsAccount} />;
};
