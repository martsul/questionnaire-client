import { FC } from "react";
import { FormHead } from "../../../types/form/form-head";
import { FormHeadBlock } from "../form-head-block/form-head-block";
import { useAuthorization } from "../../../contexts/authorization-context/use-authorization";

type Props = { head: FormHead };

export const FormHeadVisible: FC<Props> = ({ head }) => {
    const { userData } = useAuthorization();
    const canEdit = Boolean(userData?.id === head.id || userData?.isAdmin);

    return (
        <FormHeadBlock owner={head.User.name} createdAt={head.createdAt} canEdit={true}>
            <>
                <h1>{head.title}</h1>
                <p>{head.description}</p>
                {head.img && <img src={head.img} alt="img" />}
                <h2>{head.Theme.theme}</h2>
            </>
        </FormHeadBlock>
    );
};
