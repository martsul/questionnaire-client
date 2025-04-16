import { FC } from "react";
import { FormHead } from "../../../types/form/form-head";
import { useAppSelector } from "../../../redux/hooks";
import { selectTags } from "../../../redux/entities/forms/forms-slice";
import { FormHeadTag } from "../form-head-tag/form-head-tag";
import MDEditor from "@uiw/react-md-editor";
import styles from "./form-head-visible.module.css";
import classNames from "classnames";
import { useTheme } from "../../../contexts/theme-context/use-theme";

type Props = { head: FormHead };

export const FormHeadVisible: FC<Props> = ({ head }) => {
    const tags = useAppSelector(selectTags);
    const { theme } = useTheme();

    return (
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
    );
};
