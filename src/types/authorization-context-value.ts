import { AuthorizationResponse } from "./authorization-response";
import { UserData } from "./user-data";

export type AuthorizationContextValue = {
    userData: UserData;
    addUser: (
        data: Omit<AuthorizationResponse, "accessToken" | "refreshToken">
    ) => void;
    deleteUser: () => void;
};
