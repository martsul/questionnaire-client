import { FC } from "react";
import { Badge } from "react-bootstrap";
import { useFormContext } from "../../../contexts/form-context/use-form-context";

type Props = {
    text: string;
    onDelete?: () => void;
};

export const FormHeadTag: FC<Props> = ({ text, onDelete }) => {
    const { isEdit } = useFormContext();

    return (
        <Badge className="d-flex align-items-center gap-1 fs-6">
            <span>{text}</span>
            {isEdit && (
                <button onClick={onDelete} type="button">
                    <i className="bi bi-x"></i>
                </button>
            )}
        </Badge>
    );
};
