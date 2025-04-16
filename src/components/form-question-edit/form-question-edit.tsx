import { FC } from "react";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { Form } from "react-bootstrap";
import { useAppDispatch } from "../../redux/hooks";
import {
    changeQuestionDescription,
    changeQuestionTitle,
} from "../../redux/entities/forms/forms-slice";

type Props = {
    title: string;
    description: string;
    index: number;
    inStatistic: boolean;
};

export const FormQuestionEdit: FC<Props> = ({
    title,
    description,
    index,
    inStatistic,
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
            <div className="d-flex align-items-center justify-content-between gap-3">
                <Form.Control
                    maxLength={40}
                    placeholder={words.questionTitle}
                    onChange={(event) => {
                        handlerChange("title", event.target.value);
                    }}
                    value={title}
                />
                {!inStatistic && <i className="bi bi-incognito"></i>}
            </div>

            <Form.Control
                maxLength={100}
                placeholder={words.questionDescription}
                onChange={(event) => {
                    handlerChange("description", event.target.value);
                }}
                as="textarea"
                value={description}
            />
        </>
    );
};
