import { Form } from "react-bootstrap";
import { dictionary } from "../../../constants/dictionary";
import { useFormContext } from "../../../contexts/form-context/use-form-context";
import { useLanguage } from "../../../contexts/language-context/use-language";
import styles from "./form-head-title.module.css"

export const FormHeadTitle = () => {
    const { language } = useLanguage();
    const words = dictionary[language].form;
    const {register,watch} = useFormContext()

    return (
        <>
            <Form.Control placeholder={words.title} {...register("title")} />
            <Form.Control
                className={styles.textarea}
                placeholder={words.description}
                {...register("description")}
                as="textarea"
            />
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
