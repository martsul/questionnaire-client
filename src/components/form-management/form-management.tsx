import { FC } from "react";
import { useFormContext } from "../../contexts/form-context/use-form-context";

type Props = {
    onDelete: () => void;
    onAdd: () => void;
};

export const FormManagement: FC<Props> = ({ onDelete, onAdd }) => {
    const { onSubmit } = useFormContext();

    return (
        <>
            <button type="button" onClick={onSubmit}>
                <i className="bi bi-check-lg"></i>
            </button>
            <button
                type="button"
                onClick={() => {
                    onAdd();
                }}
            >
                <i className="bi bi-plus-lg"></i>
            </button>
            <button type="button" onClick={onDelete}>
                <i className="bi bi-trash"></i>
            </button>
        </>
    );
};
