import { ChangeEventHandler, FC, MouseEventHandler } from "react";
import { dictionary } from "../../../constants/dictionary";
import { useLanguage } from "../../../contexts/language-context/use-language";
import styles from "./users-table-head.module.css";

type Props = {
    handlerMainInput: ChangeEventHandler<HTMLInputElement>
    sortUsers: MouseEventHandler<HTMLButtonElement>
}

export const UsersTableHead: FC<Props> = ({handlerMainInput, sortUsers}) => {
    const { language } = useLanguage();
    const words = dictionary[language].usersTable;

    return (
        <thead>
            <tr>
                <th className={styles.input}>
                    <input onChange={handlerMainInput} type="checkbox" />
                </th>
                <th className={styles.cell}>
                    <button id="id" onClick={sortUsers}>
                        <span>{words.id}</span>{" "}
                        <i className="bi bi-arrow-down-short"></i>
                    </button>
                </th>
                <th className={styles.cell}>
                    <button id="name" onClick={sortUsers}>
                        <span>{words.name}</span>{" "}
                        <i className="bi bi-arrow-down-short"></i>
                    </button>
                </th>
                <th className={styles.cell}>
                    <button id="isBlocked" onClick={sortUsers}>
                        <span>{words.status}</span>{" "}
                        <i className="bi bi-arrow-down-short"></i>
                    </button>
                </th>
                <th className={styles.cell}>
                    <button id="isAdmin" onClick={sortUsers}>
                        <span>{words.role}</span>{" "}
                        <i className="bi bi-arrow-down-short"></i>
                    </button>
                </th>
                <th className={styles.more}></th>
            </tr>
        </thead>
    );
};
