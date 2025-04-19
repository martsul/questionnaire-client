import { Form } from "react-bootstrap";
import { dictionary } from "../../../constants/dictionary";
import { useLanguage } from "../../../contexts/language-context/use-language";
import styles from "./form-head-title.module.css";
import MDEditor from "@uiw/react-md-editor";
import { useFormHeadTitle } from "./use-form-head-title";
import { FC } from "react";
import { useTheme } from "../../../contexts/theme-context/use-theme";

type Props = { title: string; description: string; img: string };

export const FormHeadTitle: FC<Props> = ({ description, title, img }) => {
    const { language } = useLanguage();
    const { theme } = useTheme();
    const words = dictionary[language].form;
    const { handlerChangeDescription, handlerChangeTitle, handlerFileChange } =
        useFormHeadTitle();

    return (
        <>
            <Form.Control
                maxLength={40}
                placeholder={words.title}
                value={title}
                onChange={(event) => handlerChangeTitle(event.target.value)}
            />
            <div data-color-mode={theme}>
                <MDEditor
                    value={description}
                    onChange={(event) => {
                        handlerChangeDescription(event || "");
                    }}
                />
            </div>
            <div className={styles.file}>
                {!img && <i className="bi bi-card-image fs-1"></i>}
                <input
                    className={styles.input}
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        handlerFileChange(event.target.files);
                    }}
                />
                {img && <img className={styles.img} src={img} alt="img" />}
            </div>
        </>
    );
};
