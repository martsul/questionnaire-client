import { Modal, Spinner } from "react-bootstrap";
import { useLoading } from "../../contexts/loading-context/use-loading";

export const Loader = () => {
    const { isLoading } = useLoading();

    return (
        <Modal
            style={{ zIndex: 1060 }}
            show={isLoading}
            contentClassName="bg-transparent border-0"
            className={"d-flex align-items-center justify-content-center"}
        >
            <Spinner animation="border" />
        </Modal>
    );
};
