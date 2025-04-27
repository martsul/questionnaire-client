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
};

export const AnswerForm: FC<Props> = ({ canRedact, onSubmit }) => {
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
                <span>{formattedDate || "-"}</span>
            </div>
            <FormQuestionsVisible disabled={!canRedact} />
            {canRedact && (
                <Button onClick={onSubmit}>{form.updateAnswer}</Button>
            )}
        </form>
    );
};
