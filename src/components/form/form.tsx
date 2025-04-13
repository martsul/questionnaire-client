import { FormHeadEdit } from "../form-head/form-head-edit/form-head-edit";
import { FormHeadVisible } from "../form-head/form-head-visible/form-head-visible";
import { useFormContext } from "../../contexts/form-context/use-form-context";
import { FC } from "react";
import { Button } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { FormHead } from "../../types/form/form-head";

type Props = {
    formHead: FormHead;
};

export const Form: FC<Props> = ({ formHead }) => {
    const { onSubmit, isEdit } = useFormContext();
    const { language } = useLanguage();
    const words = dictionary[language].form;

    const enterHandler = (event: React.KeyboardEvent<HTMLFormElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };

    return (
        <form
            onKeyDown={enterHandler}
            onSubmit={onSubmit}
            className="mt-5 d-flex flex-column gap-4"
        >
            {isEdit && <FormHeadEdit head={formHead} />}
            {!isEdit && <FormHeadVisible head={formHead} />}
            {isEdit && <Button type="submit">{words.save}</Button>}
        </form>
    );
};
