import { FC } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { togglePublic } from "../../../redux/entities/form/form-slice";
import { useFormHeadDetails } from "./use-form-head-details";
import { useAuthorization } from "../../../contexts/authorization-context/use-authorization";
import styles from "./form-head-details.module.css"

type Props = {
    canEdit: boolean;
    isPublic: boolean;
    likes: number;
    isLiked: boolean;
    isEdit: boolean;
    toggleEdit: () => void;
};

export const FormHeadDetails: FC<Props> = ({
    canEdit,
    isPublic,
    likes,
    isLiked,
    isEdit,
    toggleEdit,
}) => {
    const dispatch = useAppDispatch();
    const { onDelete, onLike } = useFormHeadDetails();
    const { userData } = useAuthorization();

    return (
        <div
            className={
                "d-flex justify-content-end text-muted align-items-center gap-3"
            }
        >
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
                <>
                    <button onClick={onDelete}>
                        <i className="bi bi-trash"></i>
                    </button>
                    <button type="button" onClick={toggleEdit}>
                        {isEdit && <i className="bi bi-x-lg"></i>}
                        {!isEdit && <i className="bi bi-pencil fs-6"></i>}
                    </button>
                </>
            )}
            <span className="d-flex align-items-center gap-2">
                <span>{likes}</span>
                <button className={styles.like} disabled={!userData} onClick={onLike}>
                    {isLiked && <i className="bi bi-heart-fill"></i>}
                    {!isLiked && <i className="bi bi-heart"></i>}
                </button>
            </span>
        </div>
    );
};
