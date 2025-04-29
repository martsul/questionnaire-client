import { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Question } from "../../types/form/question";
import { Form } from "react-bootstrap";
import { produce } from "immer";
import { FormQuestionEdit } from "../form-question-edit/form-question-edit";
import { FormAnswerEdit } from "../form-answer-edit/form-answer-edit";
import { QuestionType } from "../question-type/question-type";
import { FormQuestionVisible } from "../form-question-visible/form-question-visible";
import { FormAnswerVisible } from "../form-answer-visible/form-answer-visible";
import styles from "./form-question-block-edit.module.css";

type Props = {
    question: Question;
    isSelected: boolean;
    setSelectedQuestions: React.Dispatch<React.SetStateAction<Set<string>>>;
    active: boolean;
    setEditQuestion: React.Dispatch<React.SetStateAction<string>>;
};

export const FormQuestionBlockEdit: FC<Props> = ({
    question,
    isSelected,
    setSelectedQuestions,
    setEditQuestion,
    active,
}) => {
    const { type, index, title, description, inStatistic, id } = question;
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: question.id });

    const handlerChange = () => {
        setSelectedQuestions(
            produce((draft) => {
                if (isSelected) {
                    draft.delete(question.id);
                } else {
                    draft.add(question.id);
                }
            })
        );
    };

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            className="bg-body-secondary p-4 rounded d-flex flex-column gap-3"
            ref={setNodeRef}
            style={style}
            onClick={() => {
                setEditQuestion(question.id);
            }}
        >
            <div className="d-flex align-items-center gap-2">
                <div className="d-flex gap-2 align-items-center">
                    <div className={styles.drag} {...attributes} {...listeners}>
                        <i className="bi bi-list fs-4"></i>
                    </div>
                    <Form.Check onChange={handlerChange} checked={isSelected} />
                </div>
                <QuestionType type={type} index={index} />
            </div>
            <div className="d-flex flex-column gap-2">
                {active && (
                    <FormQuestionEdit
                        index={index}
                        title={title}
                        description={description}
                        inStatistic={inStatistic}
                    />
                )}
                {!active && (
                    <FormQuestionVisible
                        title={title}
                        description={description}
                        inStatistic={inStatistic}
                    />
                )}
                {active && (
                    <FormAnswerEdit
                        index={index}
                        type={type}
                        answers={question.answers}
                    />
                )}
                {!active && (
                    <FormAnswerVisible
                        id={id}
                        disabled={false}
                        answers={question.answers}
                        type={type}
                    />
                )}
            </div>
        </div>
    );
};
