import { FC } from "react";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { Form } from "react-bootstrap";
import { useAppDispatch } from "../../redux/hooks";
import {
    changeQuestionDescription,
    changeQuestionTitle,
} from "../../redux/entities/form/form-slice";
import styles from "./form-question.module.css";

type Props = {
    title: string;
    description: string;
    isPreview: boolean;
    index: number;
};

export const FormQuestion: FC<Props> = ({
    title,
    description,
    isPreview,
    index,
}) => {
    const dispatch = useAppDispatch();
    const { language } = useLanguage();
    const words = dictionary[language].form;

    const handlerChange = (item: "title" | "description", value: string) => {
        const action =
            item === "title" ? changeQuestionTitle : changeQuestionDescription;
        dispatch(action({ index, value }));
    };

    return (
        <>
            {!isPreview && (
                <Form.Control
                    placeholder={words.questionTitle}
                    onChange={(event) => {
                        handlerChange("title", event.target.value);
                    }}
                    value={title}
                />
            )}
            {isPreview && <h2>{title}</h2>}
            {!isPreview && (
                <Form.Control
                placeholder={words.questionDescription}
                    onChange={(event) => {
                        handlerChange("description", event.target.value);
                    }}
                    as="textarea"
                    value={description}
                />
            )}
            {isPreview && (
                <p className={styles.description}>
                    {description || words.noInfo}
                </p>
            )}
        </>
    );
};
