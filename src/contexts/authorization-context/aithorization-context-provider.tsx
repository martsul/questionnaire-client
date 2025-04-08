import { FC, ReactElement, useState } from "react";
import { AuthorizationContext } from ".";
import { AuthorizationResponse } from "../../types/authorization-response";
import { UserData } from "../../types/user-data";

type Props = { children: ReactElement };

export const AuthorizationContextProvider: FC<Props> = ({ children }) => {
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

    const changeStatus = ({
        isAdmin,
        isBlocked,
    }: {
        isAdmin: boolean;
        isBlocked: boolean;
    }) => {
        if (isBlocked) {
            deleteUser();
        } else if (userData) {
            setUserData({ ...userData, isAdmin });
        }
    };

    return (
        <AuthorizationContext.Provider
            value={{ userData, deleteUser, addUser, changeStatus }}
        >
            {children}
        </AuthorizationContext.Provider>
    );
};
