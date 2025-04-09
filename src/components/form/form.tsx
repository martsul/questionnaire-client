import { FormHeadEdit } from "../form-head/form-head-edit/form-head-edit";
import { FormHeadVisible } from "../form-head/form-head-visible/form-head-visible";
import { useFormContext } from "../../contexts/form-context/use-form-context";

export const Form = () => {
    const { onSubmit } = useFormContext();

    return (
        <form onSubmit={onSubmit} className="mt-5 d-flex flex-column gap-4">
            <FormHeadEdit />
            <FormHeadVisible />
            <button>sumbit</button>
        </form>
    );
};
