import { ChangeEventHandler, FC, useState } from "react";
import { UsersTable } from "../../../types/users-table";
import classNames from "classnames";
import styles from "./users-table-row.module.css";

type Props = {
    data: UsersTable;
    active: boolean;
    handlerSingleInput: ChangeEventHandler<HTMLInputElement>;
};

export const UsersTableRow: FC<Props> = ({
    data,
    active,
    handlerSingleInput,
}) => {
    const [activeDetails, setActiveDetails] = useState(false);

    return (
        <>
            <tr>
                <td>
                    <input
                        className={styles.input}
                        type="checkbox"
                        checked={active}
                        onChange={handlerSingleInput}
                        id={`${data.id}`}
                    />
                </td>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.isBlocked ? "blocked" : "availabel"}</td>
                <td>{data.isAdmin ? "admin" : "user"}</td>
                <td>
                    <button
                        onClick={() => {
                            setActiveDetails(!activeDetails);
                        }}
                        className={classNames(styles.more, {
                            [styles.active]: activeDetails,
                        })}
                    >
                        <i className="bi bi-caret-down"></i>
                    </button>
                </td>
            </tr>
            {activeDetails && (
                <tr>
                    <td colSpan={6}>some info</td>
                </tr>
            )}
        </>
    );
};
