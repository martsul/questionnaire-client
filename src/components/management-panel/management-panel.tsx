import classNames from "classnames";
import { FC, ReactElement } from "react";
import styles from "./management-panel.module.css";
import { Alert } from "react-bootstrap";

type Props = {
    isActive?: boolean;
    children: ReactElement;
};

export const ManagementPanel: FC<Props> = ({ isActive = true, children }) => {
    return (
        <div
            className={classNames(styles.panel, { [styles.active]: isActive })}
        >
            <Alert className="d-flex gap-3 m-0 p-2" variant="dark">
                {children}
            </Alert>
        </div>
    );
};
