import { FromHeadTheme } from "../form-head-theme/form-head-theme";
import { FormHeadTags } from "../form-head-tags/form-head-tags";
import { FromHeadUsers } from "../form-head-users/form-head-users";
import { useFormContext } from "../../../contexts/form-context/use-form-context";
import { FormHeadTitle } from "../form-head-title/form-head-title";
import { FormHead } from "../../../types/form/form-head";
import { FC } from "react";
import { FormHeadBlock } from "../form-head-block/form-head-block";

type Props = {
    head: FormHead;
};

export const FormHeadEdit: FC<Props> = ({ head }) => {
    const { isPublic, isEdit } = useFormContext();

    return (
        <FormHeadBlock owner={head.owner.name} createdAt={head.createdAt}>
            <>
                <FormHeadTitle />
                <FromHeadTheme />
                <FormHeadTags />
                {!isPublic && isEdit && <FromHeadUsers />}
            </>
        </FormHeadBlock>
    );
};
