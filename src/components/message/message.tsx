import { Alert } from "react-bootstrap";
import { useMessage } from "../../contexts/message-context/use-message-context";
import styles from "./message.module.css";
import classNames from "classnames";

export const Message = () => {
    const { message } = useMessage();

    return (
        <div
            className={classNames(styles.container, {
                [styles.active]: message,
            })}
        >
            <Alert variant="danger">{message?.message}</Alert>
        </div>
    );
};
