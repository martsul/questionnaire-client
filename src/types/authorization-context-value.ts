import { AuthorizationResponse } from "./authorization-response";
import { UserData } from "./user-data";

export type AuthorizationContextValue = {
    userData: UserData;
    addUser: (data: AuthorizationResponse) => void;
    deleteUser: () => void;
};
