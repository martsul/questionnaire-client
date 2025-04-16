import { FC } from "react";
import styles from "./form-comment.module.css";

type Props = {
    text: string;
    createdAt: Date;
    user: string;
};

export const FormComment: FC<Props> = ({ text, createdAt, user }) => {
    const date = new Date(createdAt);
    const formattedDate = date.toISOString().split("T")[0];

    return (
        <div className="d-flex flex-column gap-2 bg-body-secondary p-3 rounded">
            <div className="d-flex align-items-center gap-2 justify-content-between">
                <span className="fs-5">{user}</span>
                <span className="text-body-secondary fs-6">{formattedDate}</span>
            </div>
            <span className={styles.comment}>{text}</span>
        </div>
    );
};
