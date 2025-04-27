import { FC } from "react";
import styles from "./form-question-visible.module.css";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";

type Props = {
    title: string;
    description: string;
    inStatistic: boolean;
};

export const FormQuestionVisible: FC<Props> = ({
    title,
    inStatistic,
    description,
}) => {
    const { language } = useLanguage();
    const words = dictionary[language].form;

    return (
        <>
            <div className="d-flex align-items-center justify-content-between gap-3">
                <h2>{title || words.noInfo}</h2>
                {!inStatistic && <i className="bi bi-incognito"></i>}
            </div>
            {description && <p className={styles.description}>{description}</p>}
        </>
    );
};
