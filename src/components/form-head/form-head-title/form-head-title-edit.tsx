import { Form } from "react-bootstrap";
import { dictionary } from "../../../constants/dictionary";
import { useLanguage } from "../../../contexts/language-context/use-language";
import styles from "./form-head-title-edit.module.css";
import MDEditor from "@uiw/react-md-editor";
import { useFormHeadTitleEdit } from "./use-form-head-title-edit";
import { FC } from "react";
import { useTheme } from "../../../contexts/theme-context/use-theme";

type Props = { title: string; description: string; img: string };

export const FormHeadTitleEdit: FC<Props> = ({ description, title, img }) => {
    const { language } = useLanguage();
    const { theme } = useTheme();
    const words = dictionary[language].form;
    const {
        handlerChangeDescription,
        handlerChangeTitle,
        handlerFileChange,
        deleteImg,
    } = useFormHeadTitleEdit();

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
                {img && (
                    <>
                        <img className={styles.img} src={img} alt="img" />
                        <button onClick={deleteImg} className={styles.closeImg}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </>
                )}
            </div>
        </>
    );
};
