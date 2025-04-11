import { FormHeadEdit } from "../form-head/form-head-edit/form-head-edit";
import { FormHeadVisible } from "../form-head/form-head-visible/form-head-visible";
import { useFormContext } from "../../contexts/form-context/use-form-context";
import { FormEntities } from "../../types/form/form-entities";
import { FC } from "react";
import { Button } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";

type Props = {
    formData: FormEntities;
};

export const Form: FC<Props> = ({ formData }) => {
    const { onSubmit, isEdit } = useFormContext();
    const { head } = formData;
    const {language} = useLanguage()
    const words = dictionary[language].form

    return (
        <form onSubmit={onSubmit} className="mt-5 d-flex flex-column gap-4">
            {isEdit && <FormHeadEdit head={head} />}
            {!isEdit && <FormHeadVisible head={head} />}
            {isEdit && <Button type="submit">{words.save}</Button>}
        </form>
    );
};
