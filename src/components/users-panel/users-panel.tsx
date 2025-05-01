import { FC } from "react";
import { Button } from "react-bootstrap";
import { AvailableEndpoints } from "../../types/available-endpoints";
import { endpoints } from "../../constants/config";

type Props = {
    sendUsers: (endpoint: AvailableEndpoints) => void;
};

export const UsersPanel: FC<Props> = ({ sendUsers }) => {
    return (
        <>
            <Button
                onClick={() => {
                    sendUsers(endpoints.giveAdmin);
                }}
                variant="outline-success"
            >
                <i className="fs-5 bi bi-person-fill-up"></i>
            </Button>
            <Button
                onClick={() => {
                    sendUsers(endpoints.takeAdmin);
                }}
                variant="outline-danger"
            >
                <i className="fs-5 bi bi-person-fill-down"></i>
            </Button>
            <Button
                onClick={() => {
                    sendUsers(endpoints.unblock);
                }}
                variant="outline-success"
            >
                <i className="fs-5 bi bi-person-fill-check"></i>
            </Button>
            <Button
                onClick={() => {
                    sendUsers(endpoints.block);
                }}
                variant="outline-danger"
            >
                <i className="fs-5 bi bi-person-fill-lock"></i>
            </Button>
            <Button
                onClick={() => {
                    sendUsers(endpoints.deleteUsers);
                }}
                variant="outline-danger"
            >
                <i className="fs-5 bi bi-trash"></i>
            </Button>
        </>
    );
};
