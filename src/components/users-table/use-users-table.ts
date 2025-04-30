import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { useApi } from "../../hooks/use-api";
import { endpoints } from "../../constants/config";
import { UsersTable } from "../../types/users-table";
import { AvailableEndpoints } from "../../types/available-endpoints";
import { useMessage } from "../../contexts/message-context/use-message-context";
import { dictionary } from "../../constants/dictionary";
import { useLanguage } from "../../contexts/language-context/use-language";
import { sortObjects } from "../../helpers/sort-objects";
import { AxiosError } from "axios";

let data: UsersTable = [];

export const useUsersTable = () => {
    const [users, setUsers] = useState(data);
    const [selectedUsers, setSelectedUsers] = useState(new Set<number>());
    const [isAscending, setIsAscending] = useState(true);
    const { addMessage } = useMessage();
    const { language } = useLanguage();
    const words = dictionary[language].success;
    const request = useApi();

    const getUsers = useCallback(() => {
        request<UsersTable>("get", endpoints.users, true).then((response) => {
            if (!(response instanceof AxiosError)) {
                setUsers(response);
                data = response;
            }
        });
    }, [request]);

    useEffect(getUsers, [getUsers]);

    const handlerSingleInput: ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        const tempUsers = new Set(selectedUsers);
        const id = +event.target.id;
        if (tempUsers.has(id)) {
            tempUsers.delete(id);
        } else {
            tempUsers.add(id);
        }
        setSelectedUsers(tempUsers);
    };

    const handlerMainInput: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (event.target.checked) {
            setSelectedUsers(new Set(users.map((e) => e.id)));
        } else {
            setSelectedUsers(new Set());
        }
    };

    const sendUsers = async (endpoint: AvailableEndpoints) => {
        const result = await request<UsersTable>(
            "post",
            endpoint,
            true,
            JSON.stringify(Array.from(selectedUsers))
        );
        if (!(result instanceof Error)) {
            addMessage("success", words.success);
        }
        getUsers();
    };

    const onSort = (sortField: keyof UsersTable[0]) => {
        const tempUsers = [...users];
        const sortedUsers = sortObjects(
            tempUsers,
            sortField,
            isAscending
        ) as UsersTable;
        setUsers(sortedUsers);
        setIsAscending(!isAscending);
    };

    const findUsers = (value: string) => {
        if (value) {
            setUsers(users.filter((e) => e.name.toLowerCase().match(value)));
        } else {
            setUsers([...data]);
        }
    };

    return {
        users,
        handlerSingleInput,
        selectedUsers,
        handlerMainInput,
        onSort,
        findUsers,
        sendUsers,
    };
};
