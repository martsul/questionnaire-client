import { ChangeEventHandler, FC } from "react";
import { UsersTable } from "../../../types/users-table";
import styles from "./users-table-row.module.css";

type Props = {
    user: UsersTable[0];
    active: boolean;
    handlerSingleInput: ChangeEventHandler<HTMLInputElement>;
};

export const UsersTableRow: FC<Props> = ({
    user,
    active,
    handlerSingleInput,
}) => {

    return (
        <>
            <tr>
                <td>
                    <input
                        className={styles.input}
                        type="checkbox"
                        checked={active}
                        onChange={handlerSingleInput}
                        id={`${user.id}`}
                    />
                </td>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.isBlocked ? "blocked" : "available"}</td>
                <td>{user.isAdmin ? "admin" : "user"}</td>
            </tr>
        </>
    );
};
