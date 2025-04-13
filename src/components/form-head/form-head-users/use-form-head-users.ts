import { ChangeEventHandler, useState } from "react";
import { simpleApi } from "../../../api";
import { endpoints } from "../../../constants/config";
import { debounce } from "lodash";
import { AvailableUser } from "../../../types/form/available-users";
import { useAppDispatch } from "../../../redux/hooks";
import { addUser, deleteUser } from "../../../redux/entities/form/form-slice";

export const useFormHeadUsers = () => {
    const [userFilter, setUserFilter] = useState<"name" | "email">("name");
    const [availableUsers, setAvailableUsers] = useState<AvailableUser[]>([]);
    const dispatch = useAppDispatch();

    const sendToServer = async (value: string) => {
        try {
            const response = await simpleApi.get(endpoints.user, {
                params: { user: value, userFilter },
            });
            setAvailableUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const debouncedSendData = debounce(sendToServer, 100);

    const onChangeUser: ChangeEventHandler<HTMLInputElement> = async (
        event
    ) => {
        const value = event.target.value;
        debouncedSendData(value);
    };

    const handlerAddUser = (user: string) => {
        const foundItems = availableUsers.find((u) => u[userFilter] === user);
        if (foundItems) {
            dispatch(addUser(foundItems));
        }
    };

    const handlerDeleteUser = (user: AvailableUser) => {
        dispatch(deleteUser(user));
    };

    const toggleFilter = (filter: "name" | "email") => {
        return () => {
            setUserFilter(filter);
        };
    };

    const handlerEnter: React.KeyboardEventHandler<HTMLInputElement> = (
        event
    ) => {
        if (event.key === "Enter") {
            handlerAddUser(event.currentTarget.value);
            event.currentTarget.value = "";
        }
    };

    return {
        userFilter,
        onChangeUser,
        handlerAddUser,
        handlerDeleteUser,
        toggleFilter,
        handlerEnter,
        availableUsers,
    };
};
