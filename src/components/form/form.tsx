import { FormHeadEdit } from "../form-head/form-head-edit/form-head-edit";
import { FormHeadVisible } from "../form-head/form-head-visible/form-head-visible";
import { FormQuestionsEdit } from "../form-questions-edit/form-questions-edit";
import { FormQuestionsVisible } from "../form-questions-visible/form-questions-visible";
import { FormComments } from "../form-comments/form-comments";
import { FormHeadDetails } from "../form-head/form-head-details/form-head-details";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { Button } from "react-bootstrap";
import { useForm } from "./use-form";
import { useAppSelector } from "../../redux/hooks";
import { selectHead } from "../../redux/entities/form/form-slice";
import { PageTitle } from "../page-title/page-title";

export const Form = () => {
    const { language } = useLanguage();
    const { form, titles } = dictionary[language];
    const formHead = useAppSelector(selectHead);
    const { onSubmit, toggleEdit, isEdit, canSendAnswer, canEdit } = useForm();

    if (!formHead) {
        return null;
    }

    return (
        <>
            <PageTitle title={formHead.title ? formHead.title : titles.form} />
            <form
                onSubmit={(event) => event.preventDefault()}
                className="d-flex flex-column gap-4 mb-5"
            >
                <FormHeadDetails
                    likes={formHead.likes}
                    isLiked={formHead.isLiked}
                    isPublic={formHead.isPublic}
                    canEdit={canEdit}
                    isEdit={isEdit}
                    toggleEdit={toggleEdit}
                />
                <div className="bg-body-secondary p-4 rounded d-flex flex-column gap-3 position-relative">
                    {isEdit && <FormHeadEdit head={formHead} />}
                    {!isEdit && <FormHeadVisible head={formHead} />}
                </div>
                {isEdit && <FormQuestionsEdit />}
                {!isEdit && <FormQuestionsVisible />}
                {canSendAnswer && (
                    <Button onClick={onSubmit}>{form.send}</Button>
                )}
            </form>
            <FormComments formId={formHead.id} />
        </>
    );
};
