import { FC, ReactElement } from "react";
import { FormHeadDetails } from "../form-head-details/form-head-details";

type Props = {
    children: ReactElement;
    canEdit: boolean;
    isPublic: boolean;
    likes: number;
    isLiked: boolean;
};

export const FormHeadBlock: FC<Props> = ({
    children,
    canEdit,
    isPublic,
    likes,
    isLiked,
}) => {
    return (
        <div className="bg-body-secondary p-4 rounded d-flex flex-column gap-3">
            <FormHeadDetails
                likes={likes}
                isLiked={isLiked}
                canEdit={canEdit}
                isPublic={isPublic}
            />
            {children}
        </div>
    );
};
