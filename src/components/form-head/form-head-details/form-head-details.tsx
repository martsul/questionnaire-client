import { FC } from "react";
import { useFormContext } from "../../../contexts/form-context/use-form-context";
import { useAppDispatch } from "../../../redux/hooks";
import { togglePublic } from "../../../redux/entities/form/form-slice";

type Props = {
    canEdit: boolean;
    owner: string;
    createdAt: Date;
    isPublic: boolean;
};

export const FormHeadDetails: FC<Props> = ({
    canEdit,
    owner,
    createdAt,
    isPublic,
}) => {
    const dispatch = useAppDispatch()
    const { isEdit, toggleEdit } = useFormContext();
    const date = new Date(createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    return (
        <div className="d-flex justify-content-between text-muted align-items-center">
            <span>{owner}</span>
            <div className="d-flex align-items-center gap-3">
                {isEdit && (
                    <button
                        type="button"
                        className="fs-4"
                        onClick={() => {dispatch(togglePublic())}}
                    >
                        {!isPublic && (
                            <i className="bi bi-eye-slash text-muted"></i>
                        )}
                        {isPublic && <i className="bi bi-eye"></i>}
                    </button>
                )}
                {canEdit && (
                    <button type="button" onClick={toggleEdit}>
                        {isEdit && <i className="bi bi-x-lg"></i>}
                        {!isEdit && <i className="bi bi-pencil fs-6"></i>}
                    </button>
                )}
                <span>{date}</span>
            </div>
        </div>
    );
};
