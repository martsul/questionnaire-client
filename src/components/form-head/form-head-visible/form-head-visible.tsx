import { FC } from "react";
import { FormHead } from "../../../types/form/form-head";
import { FormHeadBlock } from "../form-head-block/form-head-block";
import { useAuthorization } from "../../../contexts/authorization-context/use-authorization";
import { useAppSelector } from "../../../redux/hooks";
import { selectTags } from "../../../redux/entities/form/form-slice";
import { FormHeadTag } from "../form-head-tag/form-head-tag";

type Props = { head: FormHead };

export const FormHeadVisible: FC<Props> = ({ head }) => {
    const { userData } = useAuthorization();
    const tags = useAppSelector(selectTags);
    const canEdit = Boolean(userData?.id === head.id || userData?.isAdmin);

    return (
        <FormHeadBlock
            owner={head.owner.name}
            createdAt={head.createdAt}
            canEdit={true}
        >
            <>
                <h1>{head.title}</h1>
                <p>{head.description}</p>
                {head.img && <img src={head.img} alt="img" />}
                <h2>{head.Theme.theme}</h2>
                <div className="d-flex gap-2 flex-wrap">
                    {tags && Array.from(tags.addTags).map(t => <FormHeadTag text={t} key={t} />)}
                </div>
            </>
        </FormHeadBlock>
    );
};
