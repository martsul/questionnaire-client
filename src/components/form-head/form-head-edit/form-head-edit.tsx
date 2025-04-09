import { FormHeadDetails } from "../form-head-details/form-head-details";
import { FromHeadTheme } from "../form-head-theme/form-head-theme";
import { FormHeadTags } from "../form-head-tags/form-head-tags";
import { FromHeadUsers } from "../form-head-users/form-head-users";
import { useFormContext } from "../../../contexts/form-context/use-form-context";
import { FormHeadTitle } from "../form-head-title/form-head-title";

export const FormHeadEdit = () => {
    const {  isPublic, isEdit} = useFormContext();

    return (
        <div className="bg-body-secondary p-4 rounded d-flex flex-column gap-3">
            <FormHeadDetails />
            <FormHeadTitle />
            <FromHeadTheme />
            <FormHeadTags />
            {!isPublic && isEdit && <FromHeadUsers />}
        </div>
    );
};
