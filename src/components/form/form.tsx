import { FormHeadEdit } from "../form-head/form-head-edit/form-head-edit";
import { FormHeadVisible } from "../form-head/form-head-visible/form-head-visible";
import { FC } from "react";
import { FormHead } from "../../types/form/form-head";
import { FormQuestionsEdit } from "../form-questions-edit/form-questions-edit";
import { useAuthorization } from "../../contexts/authorization-context/use-authorization";
import { FormQuestionsVisible } from "../form-questions-visible/form-questions-visible";
import { FormComments } from "../form-comments/form-comments";
import { useForm } from "./use-form";
import { FormHeadDetails } from "../form-head/form-head-details/form-head-details";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { Button } from "react-bootstrap";

type Props = {
    formHead: FormHead;
};

export const Form: FC<Props> = ({ formHead }) => {
    const { language } = useLanguage();
    const words = dictionary[language].form;
    const { userData } = useAuthorization();
    const { isEdit, onLike, toggleEdit, onSubmit } = useForm();
    const canEdit = Boolean(
        userData?.id === formHead.ownerId || userData?.isAdmin
    );

    return (
        <>
            <form
                onSubmit={(event) => event.preventDefault()}
                className="d-flex flex-column gap-4"
            >
                <FormHeadDetails
                    likes={formHead.likes}
                    isLiked={formHead.isLiked}
                    isPublic={formHead.isPublic}
                    canEdit={canEdit}
                    isEdit={isEdit}
                    toggleEdit={toggleEdit}
                    onLike={onLike}
                />
                <div className="bg-body-secondary p-4 rounded d-flex flex-column gap-3 position-relative">
                    {isEdit && <FormHeadEdit head={formHead} />}
                    {!isEdit && <FormHeadVisible head={formHead} />}
                </div>
                {isEdit && <FormQuestionsEdit />}
                {!isEdit && <FormQuestionsVisible />}
                {!isEdit && <Button onClick={onSubmit}>{words.send}</Button>}
            </form>
            <FormComments formId={formHead.id} />
        </>
    );
};
