import { Outlet } from "react-router-dom";
import { useAuthorization } from "../../contexts/authorization-context/use-authorization";
import { useAppSelector } from "../../redux/hooks";
import { selectHead } from "../../redux/entities/form/form-slice";
import { FormNavigate } from "../form-navigate/form-navigate";

export const FormLayout = () => {
    const { userData } = useAuthorization();
    const formHead = useAppSelector(selectHead);
    const canNavigate =
        userData?.isAdmin ||
        (formHead?.ownerId && formHead?.ownerId === userData?.id    );

    return (
        <section>
            {canNavigate && <FormNavigate />}
            <Outlet />
        </section>
    );
};
