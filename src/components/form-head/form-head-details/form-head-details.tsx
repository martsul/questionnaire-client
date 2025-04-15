import { FC } from "react";
import { useFormContext } from "../../../contexts/form-context/use-form-context";
import { useAppDispatch } from "../../../redux/hooks";
import { togglePublic } from "../../../redux/entities/form/form-slice";

type Props = {
    canEdit: boolean;
    isPublic: boolean;
    likes: number;
    isLiked: boolean;
};

export const FormHeadDetails: FC<Props> = ({
    canEdit,
    isPublic,
    likes,
    isLiked,
}) => {
    const dispatch = useAppDispatch();
    const { isEdit, toggleEdit, onLike } = useFormContext();

    return (
        <div className="d-flex justify-content-between text-muted align-items-center">
            <span>owner</span>
            <div className="d-flex align-items-center gap-3">
                {isEdit && (
                    <button
                        type="button"
                        className="fs-4"
                        onClick={() => {
                            dispatch(togglePublic());
                        }}
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
                <span className="d-flex align-items-center gap-2">
                    <span>{likes}</span>
                    <button onClick={onLike}>
                        {isLiked && <i className="bi bi-heart-fill"></i>}
                        {!isLiked && <i className="bi bi-heart"></i>}
                    </button>
                </span>
                <span>date</span>
            </div>
        </div>
    );
};
