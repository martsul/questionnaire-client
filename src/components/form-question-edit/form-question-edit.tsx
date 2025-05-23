import { FC } from "react";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppDispatch } from "../../redux/hooks";
import {
    changeQuestionDescription,
    changeQuestionTitle,
} from "../../redux/entities/form/form-slice";

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
    const { form, tooltips } = dictionary[language];

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
                    placeholder={form.questionTitle}
                    onChange={(event) => {
                        handlerChange("title", event.target.value);
                    }}
                    value={title}
                />
                {!inStatistic && (
                    <OverlayTrigger overlay={<Tooltip>{tooltips.confidential}</Tooltip>}>
                        <i className="bi bi-incognito"></i>
                    </OverlayTrigger>
                )}
            </div>

            <Form.Control
                maxLength={100}
                placeholder={form.questionDescription}
                onChange={(event) => {
                    handlerChange("description", event.target.value);
                }}
                as="textarea"
                value={description}
            />
        </>
    );
};
