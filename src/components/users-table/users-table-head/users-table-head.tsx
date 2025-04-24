import { ChangeEventHandler, FC } from "react";
import { dictionary } from "../../../constants/dictionary";
import { useLanguage } from "../../../contexts/language-context/use-language";
import styles from "./users-table-head.module.css";
import { FilterColumn } from "../../filter-column/filter-column";
import { UsersTable } from "../../../types/users-table";

type Props = {
    handlerMainInput: ChangeEventHandler<HTMLInputElement>;
    onSort: (sortField: keyof UsersTable["users"][0]) => void;
};

export const UsersTableHead: FC<Props> = ({ handlerMainInput, onSort }) => {
    const { language } = useLanguage();
    const words = dictionary[language].usersTable;

    return (
        <thead>
            <tr>
                <th className={styles.input}>
                    <input className={styles.mainInput} onChange={handlerMainInput} type="checkbox" />
                </th>
                <FilterColumn text={words.id} onSort={() => onSort("id")} />
                <FilterColumn text={words.name} onSort={() => onSort("name")} />
                <FilterColumn
                    text={words.status}
                    onSort={() => onSort("isBlocked")}
                />
                <FilterColumn
                    text={words.role}
                    onSort={() => onSort("isAdmin")}
                />
            </tr>
        </thead>
    );
};
