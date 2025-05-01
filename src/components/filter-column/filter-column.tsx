import { FC } from "react";
import styles from "./filter-column.module.css";

type Props = {
    onSort: () => void;
    text: string;
};

export const FilterColumn: FC<Props> = ({ onSort, text }) => {
    return (
        <th className={styles.tr}>
            <button
                className="d-flex align-items-center gap-1 text-nowrap"
                onClick={onSort}
            >
                {text}
                <i className={"bi bi-arrow-down-short " + styles.arrow}></i>
            </button>
        </th>
    );
};
