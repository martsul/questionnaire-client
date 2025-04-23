import {
    ChangeEventHandler,
    MouseEventHandler,
    useEffect,
    useState,
} from "react";
import { useApi } from "../../hooks/use-api";
import { endpoints } from "../../constants/config";
import { UsersTable } from "../../types/users-table";
import { AvailableEndpoints } from "../../types/available-endpoints";
import { useMessage } from "../../contexts/message-context/use-message-context";
import { dictionary } from "../../constants/dictionary";
import { useLanguage } from "../../contexts/language-context/use-language";
import { useAuthorization } from "../../contexts/authorization-context/use-authorization";
import { sortObjects } from "../../helpers/sort-objects";

let data: UsersTable["users"] = [];

export const useUsersTable = () => {
    const [users, setUsers] = useState(data);
    const [selectedUsers, setSelectedUsers] = useState(new Set<number>());
    const [isAscending, setIsAscending] = useState(true);
    const { addMessage } = useMessage();
    const { language } = useLanguage();
    const words = dictionary[language].success;
    const request = useApi();
    const { changeStatus } = useAuthorization();

    useEffect(() => {
        request<UsersTable>("get", endpoints.users, true).then((response) => {
            if (!(response instanceof Error)) {
                setUsers(response.users);
                data = response.users;
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const sendUsers = (endpoint: AvailableEndpoints) => {
        request<UsersTable>(
            "post",
            endpoint,
            true,
            JSON.stringify(Array.from(selectedUsers))
        ).then((response) => {
            if (!(response instanceof Error)) {
                setUsers(response.users);
                data = response.users;
                addMessage("success", words.success);
                changeStatus(response.status);
            }
        });
    };

    const sortUsers: MouseEventHandler<HTMLButtonElement> = (event) => {
        const sortBy = event.currentTarget.id as keyof UsersTable["users"][0];
        const tempUsers = [...users];
        const sortedUsers = sortObjects(tempUsers, sortBy, isAscending) as UsersTable["users"]
        setUsers(sortedUsers);
        setIsAscending(!isAscending);
    };

    const findUsers: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
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
        sortUsers,
        findUsers,
        sendUsers,
    };
};
