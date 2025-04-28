import { Button } from "react-bootstrap";
import { FormQuestionsVisible } from "../form-questions-visible/form-questions-visible";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { FC } from "react";
import { useAppSelector } from "../../redux/hooks";
import {
    selectCreatedAt,
    selectUser,
} from "../../redux/entities/answers/answers-slice";
import { format, isValid, parseISO } from "date-fns";

type Props = {
    canRedact: boolean;
    onSubmit: () => void;
    onDelete: () => void
};

export const AnswerForm: FC<Props> = ({ canRedact, onSubmit, onDelete }) => {
    const { language } = useLanguage();
    const { form } = dictionary[language];
    const ownerAnswer = useAppSelector(selectUser);
    const createdAt = useAppSelector(selectCreatedAt);
    const date = parseISO(createdAt);
    let formattedDate: string = "";
    if (isValid(date)) {
        formattedDate = format(date, "yyyy-MM-dd");
    }

    return (
        <form className="d-flex flex-column gap-4">
            <div className="d-flex align-items-center justify-content-between">
                <span>{ownerAnswer.name}</span>
                <div className="d-flex align-items-center gap-3">
                    {canRedact && (
                        <button type="button" onClick={onDelete}>
                            <i className="bi bi-trash"></i>
                        </button>
                    )}
                    <span>{formattedDate || "-"}</span>
                </div>
            </div>
            <FormQuestionsVisible disabled={!canRedact} />
            {canRedact && (
                <Button type="submit" onClick={onSubmit}>{form.updateAnswer}</Button>
            )}
        </form>
    );
};
