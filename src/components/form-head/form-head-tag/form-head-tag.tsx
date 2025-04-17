import { FC } from "react";
import { Badge } from "react-bootstrap";

type Props = {
    text: string;
    onDelete?: () => void;
    isEdit:boolean
};

export const FormHeadTag: FC<Props> = ({ text, onDelete, isEdit }) => {
    return (
        <Badge className="d-flex align-items-center gap-1 fs-6">
            <span>{text}</span>
            {isEdit && (
                <button className="text-white" onClick={onDelete} type="button">
                    <i className="bi bi-x"></i>
                </button>
            )}
        </Badge>
    );
};
