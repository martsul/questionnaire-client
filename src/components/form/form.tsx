import { FormHeadEdit } from "../form-head/form-head-edit/form-head-edit";
import { FormHeadVisible } from "../form-head/form-head-visible/form-head-visible";
import { useFormContext } from "../../contexts/form-context/use-form-context";
import { FC } from "react";
import { FormHead } from "../../types/form/form-head";
import { FormQuestions } from "../form-questions/form-questions";


type Props = {
    formHead: FormHead;
};

export const Form: FC<Props> = ({ formHead }) => {
    const { isEdit } = useFormContext();

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
            }}
            className="my-5 d-flex flex-column gap-4"
        >
            {isEdit && <FormHeadEdit head={formHead} />}
            {!isEdit && <FormHeadVisible head={formHead} />}
            <FormQuestions />
        </form>
    );
};
