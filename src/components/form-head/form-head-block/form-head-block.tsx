import { FC, ReactElement } from "react";
import { FormHeadDetails } from "../form-head-details/form-head-details";

type Props = {
    children: ReactElement;
    canEdit?: boolean;
    owner: string;
    createdAt: Date;
};

export const FormHeadBlock: FC<Props> = ({
    children,
    canEdit = true,
    owner,
    createdAt,
}) => {
    return (
        <div className="bg-body-secondary p-4 rounded d-flex flex-column gap-3">
            <FormHeadDetails
                canEdit={canEdit}
                owner={owner}
                createdAt={createdAt}
            />
            {children}
        </div>
    );
};
