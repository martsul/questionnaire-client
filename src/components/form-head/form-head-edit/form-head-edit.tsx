import { FromHeadThemeEdit } from "../form-head-theme-edit/form-head-theme-edit";
import { FormHeadTagsEdit } from "../form-head-tags-edit/form-head-tags-edit";
import { FromHeadUsersEdit } from "../form-head-users-edit/form-head-users-edit";
import { FormHeadTitleEdit } from "../form-head-title/form-head-title-edit";
import { FormHead } from "../../../types/form/form-head";
import { FC } from "react";

type Props = {
    head: FormHead;
};

export const FormHeadEdit: FC<Props> = ({ head }) => {
    const { title, description, isPublic, themes, theme, img } = head;

    return (
        <div className="bg-body-secondary p-4 rounded d-flex flex-column gap-3 position-relative">
            <FormHeadTitleEdit
                img={img}
                title={title}
                description={description}
            />
            <FromHeadThemeEdit themes={themes} theme={theme} />
            <FormHeadTagsEdit />
            {!isPublic && <FromHeadUsersEdit />}
        </div>
    );
};
