import classNames from "classnames";
import { FC } from "react";
import styles from "./management-panel.module.css";
import { Alert, Button } from "react-bootstrap";
import { AvailableEndpoints } from "../../types/available-endpoints";
import { endpoints } from "../../constants/config";

type Props = {
    isActive: boolean;
    sendUsers: (endpoint: AvailableEndpoints) => void;
};

export const ManagementPanel: FC<Props> = ({ isActive, sendUsers }) => {
    return (
        <div
            className={classNames(styles.panel, { [styles.active]: isActive })}
        >
            <Alert className="d-flex gap-3 m-0" variant="dark">
                <Button
                    onClick={() => {
                        sendUsers(endpoints.giveAdmin);
                    }}
                    variant="outline-success"
                >
                    <i className="fs-4 bi bi-person-fill-up"></i>
                </Button>
                <Button
                    onClick={() => {
                        sendUsers(endpoints.takeAdmin);
                    }}
                    variant="outline-danger"
                >
                    <i className="fs-4 bi bi-person-fill-down"></i>
                </Button>
                <Button
                    onClick={() => {
                        sendUsers(endpoints.unblock);
                    }}
                    variant="outline-success"
                >
                    <i className="fs-4 bi bi-person-fill-check"></i>
                </Button>
                <Button
                    onClick={() => {
                        sendUsers(endpoints.block);
                    }}
                    variant="outline-danger"
                >
                    <i className="fs-4 bi bi-person-fill-lock"></i>
                </Button>
            </Alert>
        </div>
    );
};
