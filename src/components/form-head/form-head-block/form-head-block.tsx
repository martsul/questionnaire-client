import { FC, ReactElement } from "react";
import { FormHeadDetails } from "../form-head-details/form-head-details";

type Props = {
    children: ReactElement;
    canEdit?: boolean;
    owner: string;
    createdAt: Date;
    isPublic: boolean;
};

export const FormHeadBlock: FC<Props> = ({
    children,
    canEdit = true,
    owner,
    createdAt,
    isPublic
}) => {
    return (
        <div className="bg-body-secondary p-4 rounded d-flex flex-column gap-3">
            <FormHeadDetails
                canEdit={canEdit}
                owner={owner}
                createdAt={createdAt}
                isPublic={isPublic}
            />
            {children}
        </div>
    );
};
