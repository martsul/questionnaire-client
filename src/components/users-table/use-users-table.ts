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

let data: UsersTable[] = [];

export const useUsersTable = () => {
    const [users, setUsers] = useState(data);
    const [selectedUsers, setSelectedUsers] = useState(new Set<number>());
    const [isAscending, setIsAscending] = useState(true);
    const request = useApi();

    useEffect(() => {
        request<UsersTable[]>("get", endpoints.users).then((response) => {
            if (response) {
                setUsers(response);
                data = response;
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
        request<UsersTable[]>(
            "post",
            endpoint,
            JSON.stringify(Array.from(selectedUsers))
        ).then((response) => {
            if (response) {
                setUsers(response);
                data = response;
            }
        });
        setSelectedUsers(new Set());
    };

    const sortUsers: MouseEventHandler<HTMLButtonElement> = (event) => {
        const id = event.currentTarget.id as keyof UsersTable;
        const tempUsers = [...users];
        tempUsers.sort((a, b) =>
            isAscending ? +(a[id] > b[id]) : +(a[id] < b[id])
        );
        setUsers(tempUsers);
        setIsAscending(!isAscending);
    };

    const filterUsers: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        if (value) {
            setUsers(users.filter((e) => e.name.match(value)));
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
        filterUsers,
        sendUsers,
    };
};
