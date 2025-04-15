import { FormHeadEdit } from "../form-head/form-head-edit/form-head-edit";
import { FormHeadVisible } from "../form-head/form-head-visible/form-head-visible";
import { useFormContext } from "../../contexts/form-context/use-form-context";
import { FC } from "react";
import { FormHead } from "../../types/form/form-head";
import { FormQuestionsEdit } from "../form-questions-edit/form-questions-edit";
import { FormHeadBlock } from "../form-head/form-head-block/form-head-block";
import { useAuthorization } from "../../contexts/authorization-context/use-authorization";
import { FormQuestionsVisible } from "../form-questions-visible/form-questions-visible";
import { FormCommentsContainer } from "../form-comments/form-comments-container";

type Props = {
    formHead: FormHead;
};

export const Form: FC<Props> = ({ formHead }) => {
    const { isEdit } = useFormContext();
    const { userData } = useAuthorization();
    const canEdit = Boolean(
        userData?.id === formHead.ownerId || userData?.isAdmin
    );

    return (
        <>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                }}
                className="my-5 d-flex flex-column gap-4"
            >
                {" "}
                <FormHeadBlock
                    likes={formHead.likes}
                    isLiked={formHead.isLiked}
                    isPublic={formHead.isPublic}
                    canEdit={canEdit}
                >
                    <>
                        {isEdit && <FormHeadEdit head={formHead} />}
                        {!isEdit && <FormHeadVisible head={formHead} />}
                    </>
                </FormHeadBlock>
                {isEdit && <FormQuestionsEdit />}
                {!isEdit && <FormQuestionsVisible />}
            </form>
            <FormCommentsContainer />
        </>
    );
};
