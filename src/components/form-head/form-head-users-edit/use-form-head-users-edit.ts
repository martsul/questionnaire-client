import { useState } from "react";
import { api } from "../../../api";
import { endpoints } from "../../../constants/config";
import { debounce } from "lodash";
import { AvailableUser } from "../../../types/form/available-users";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectUsers, setUsers } from "../../../redux/entities/form/form-slice";
import { SelectValue } from "../../../types/select-value";
import { MultiValue } from "react-select";
import { ApiResponse } from "../../../types/api-response";

const getUsers = async (user: string, userFilter: "name" | "email") => {
    const response: ApiResponse<AvailableUser[]> = await api.get(
        endpoints.user,
        {
            params: { user, userFilter },
        }
    );
    return response.data;
};

const convertUsers = (users: AvailableUser[], userFIlter: "name" | "email") => {
    return users.map((user) => ({
        label: user[userFIlter],
        value: JSON.stringify(user),
    }));
};

export const useFormHeadUsersEdit = () => {
    const [userFilter, setUserFilter] = useState<"name" | "email">("name");
    const [availableUsers, setAvailableUsers] = useState<SelectValue[]>([]);
    const users = useAppSelector(selectUsers);
    const dispatch = useAppDispatch();

    const sendToServer = async (value: string) => {
        try {
            const users = await getUsers(value, userFilter);
            setAvailableUsers(convertUsers(users, userFilter));
        } catch (error) {
            console.error(error);
        }
    };

    const debouncedSendData = debounce(sendToServer, 100);

    const onChangeUser = (value: string) => {
        debouncedSendData(value);
    };

    const handlerSetUsers = (users: MultiValue<SelectValue>) => {
        dispatch(setUsers(users.map((user) => JSON.parse(user.value))));
    };

    const toggleFilter = (filter: "name" | "email") => {
        return () => {
            setUserFilter(filter);
        };
    };

    return {
        users: convertUsers(users, userFilter),
        usersOptions: availableUsers,
        userFilter,
        onChangeUser,
        handlerSetUsers,
        toggleFilter,
    };
};
