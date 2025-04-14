import { Form } from "react-bootstrap";
import { dictionary } from "../../../constants/dictionary";
import { useFormContext } from "../../../contexts/form-context/use-form-context";
import { useLanguage } from "../../../contexts/language-context/use-language";
import styles from "./form-head-title.module.css";
import MDEditor from "@uiw/react-md-editor";
import { useFormHeadTitle } from "./use-form-head-title";
import { FC } from "react";

type Props = { title: string; description: string };

export const FormHeadTitle: FC<Props> = ({ description, title }) => {
    const { language } = useLanguage();
    const words = dictionary[language].form;
    const { register, watch } = useFormContext();
    const { handlerChangeDescription, handlerChangeTitle } = useFormHeadTitle();

    return (
        <>
            <Form.Control
                placeholder={words.title}
                value={title}
                onChange={(event) => handlerChangeTitle(event.target.value)}
            />
            <div>
                <MDEditor
                    value={description}
                    onChange={(event) => {
                        handlerChangeDescription(event || "");
                    }}
                />
            </div>
            <div className={styles.file}>
                {!watch("img")?.length && (
                    <i className="bi bi-card-image fs-1"></i>
                )}
                <input
                    className={styles.input}
                    type="file"
                    accept="image/*"
                    {...register("img")}
                />
                {Boolean(watch("img")?.length) && (
                    <img
                        className={styles.img}
                        src={URL.createObjectURL(watch("img")[0])}
                        alt="img"
                    />
                )}
            </div>
        </>
    );
};
