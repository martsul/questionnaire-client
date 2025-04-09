import { Badge } from "react-bootstrap";

export const FormHeadTag = () => {
    return (
        <Badge className="d-flex align-items-center gap-1 fs-6">
            <span>Text</span>
            <button type="button">
                <i className="bi bi-x"></i>
            </button>
        </Badge>
    );
};
