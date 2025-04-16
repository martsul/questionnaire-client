import { Button, Form } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { FC } from "react";
import { useFormComments } from "./use-form-comments";
import { FormComment } from "../form-comment/form-comment";

type Props = {
    formId: number;
};

export const FormComments: FC<Props> = ({ formId }) => {
    const { language } = useLanguage();
    const words = dictionary[language].form;
    const { comments, comment, onSubmit, setComment } = useFormComments(formId);

    return (
        <form onSubmit={onSubmit} className="mb-5">
            <h2>{words.commentsTitle}</h2>
            <div className="d-flex flex-column gap-2 align-items-end mb-5">
                <Form.Control
                    maxLength={256}
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder={words.commentsInput}
                    as="textarea"
                />
                <Button type="submit">{words.send}</Button>
            </div>
            <div className="d-flex flex-column gap-3">
                {comments.map((c) => (
                    <FormComment
                        key={c.id}
                        text={c.text}
                        createdAt={c.createdAt}
                        user={c.User.name}
                    />
                ))}
            </div>
        </form>
    );
};
