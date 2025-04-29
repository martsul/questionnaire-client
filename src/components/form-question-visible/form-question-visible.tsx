import { FC } from "react";
import styles from "./form-question-visible.module.css";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

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
    const {form, tooltips} = dictionary[language];

    return (
        <>
            <div className="d-flex align-items-center justify-content-between gap-3">
                <h2>{title || form.noInfo}</h2>
                {!inStatistic && (
                    <OverlayTrigger overlay={<Tooltip>{tooltips.confidential}</Tooltip>}>
                        <i className="bi bi-incognito"></i>
                    </OverlayTrigger>
                )}
            </div>
            {description && <p className={styles.description}>{description}</p>}
        </>
    );
};
