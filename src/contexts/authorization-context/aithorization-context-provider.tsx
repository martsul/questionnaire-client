import { FC, useState } from "react";
import { AuthorizationContext } from ".";
import { AuthorizationResponse } from "../../types/authorization-response";
import { UserData } from "../../types/user-data";
import { ProviderProps } from "../../types/provider-props";

export const AuthorizationContextProvider: FC<ProviderProps> = ({
    children,
}) => {
    const [userData, setUserData] = useState<UserData>(null);

    const addUser = (
        data: Omit<AuthorizationResponse, "accessToken" | "refreshToken">
    ) => {
        setUserData({
            id: data.id,
            userName: data.name,
            isAdmin: data.isAdmin,
        });
    };

    const deleteUser = () => {
        localStorage.removeItem("accessToken");
        setUserData(null);
    };

    return (
        <AuthorizationContext.Provider
            value={{ userData, deleteUser, addUser }}
        >
            {children}
        </AuthorizationContext.Provider>
    );
};
