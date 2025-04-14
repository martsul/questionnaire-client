import { FC } from "react";
import { FormHead } from "../../../types/form/form-head";
import { FormHeadBlock } from "../form-head-block/form-head-block";
import { useAuthorization } from "../../../contexts/authorization-context/use-authorization";
import { useAppSelector } from "../../../redux/hooks";
import { selectTags } from "../../../redux/entities/form/form-slice";
import { FormHeadTag } from "../form-head-tag/form-head-tag";
import MDEditor from "@uiw/react-md-editor";
import styles from "./form-head-visible.module.css";
import classNames from "classnames";
import { useTheme } from "../../../contexts/theme-context/use-theme";

type Props = { head: FormHead };

export const FormHeadVisible: FC<Props> = ({ head }) => {
    const { userData } = useAuthorization();
    const tags = useAppSelector(selectTags);
    const canEdit = Boolean(userData?.id === head.id || userData?.isAdmin);
    const { theme } = useTheme();

    return (
        <FormHeadBlock
            owner={head.owner.name}
            createdAt={head.createdAt}
            canEdit={canEdit}
            isPublic={head.isPublic}
        >
            <>
                <h1>{head.title}</h1>
                <MDEditor.Markdown
                    className={classNames(
                        styles.markdown,
                        { "text-light": theme === "dark" },
                        { "text-dark": theme === "light" }
                    )}
                    source={head.description}
                />
                {head.img && <img src={head.img} alt="img" />}
                <h2 className="text-capitalize">{head.theme}</h2>
                <div className="d-flex gap-2 flex-wrap">
                    {tags && tags.map((t) => <FormHeadTag text={t} key={t} />)}
                </div>
            </>
        </FormHeadBlock>
    );
};
