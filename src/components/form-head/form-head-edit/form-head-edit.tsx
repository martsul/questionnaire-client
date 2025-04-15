import { FromHeadTheme } from "../form-head-theme/form-head-theme";
import { FormHeadTags } from "../form-head-tags/form-head-tags";
import { FromHeadUsers } from "../form-head-users/form-head-users";
import { useFormContext } from "../../../contexts/form-context/use-form-context";
import { FormHeadTitle } from "../form-head-title/form-head-title";
import { FormHead } from "../../../types/form/form-head";
import { FC } from "react";

type Props = {
    head: FormHead;
};

export const FormHeadEdit: FC<Props> = ({ head }) => {
    const { isEdit } = useFormContext();
    const { title, description, isPublic, themes, theme, img} = head;

    return (
            <>
                <FormHeadTitle img={img} title={title} description={description} />
                <FromHeadTheme themes={themes} theme={theme} />
                <FormHeadTags />
                {!isPublic && isEdit && <FromHeadUsers />}
            </>
    );
};
