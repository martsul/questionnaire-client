import { ChangeEventHandler, FC } from "react";
import { UsersTable } from "../../../types/users-table";
import { UsersTableRow } from "../users-table-row/users-table-row";

type Props = {
    users: UsersTable["users"];
    selectedUsers: Set<number>;
    handlerSingleInput: ChangeEventHandler<HTMLInputElement>;
};

export const UsersTableBody: FC<Props> = ({
    users,
    selectedUsers,
    handlerSingleInput,
}) => {
    return (
        <tbody>
            {users.map((e) => (
                <UsersTableRow
                    active={selectedUsers.has(e.id)}
                    handlerSingleInput={handlerSingleInput}
                    user={e}
                    key={e.id}
                />
            ))}
        </tbody>
    );
};
