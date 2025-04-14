import { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Question } from "../../types/form/question";
import { Form } from "react-bootstrap";
import { produce } from "immer";
import { FormQuestion } from "../form-question/form-question";
import { FormAnswer } from "../form-answer/form-answer";
import { useFormContext } from "../../contexts/form-context/use-form-context";
import { QuestionType } from "../question-type/question-type";

type Props = {
    question: Question;
    isSelected: boolean;
    setSelectedQuestions: React.Dispatch<React.SetStateAction<Set<string>>>;
    active: boolean;
    setEditQuestion: React.Dispatch<React.SetStateAction<string>>;
};

export const FormBlock: FC<Props> = ({
    question,
    isSelected,
    setSelectedQuestions,
    setEditQuestion,
    active,
}) => {
    const { type, index, title, description } = question;
    const { isEdit } = useFormContext();
    const isPreview = !(active && isEdit);
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
                    <div {...attributes} {...listeners}>
                        ☰
                    </div>
                    <Form.Check onChange={handlerChange} checked={isSelected} />
                </div>
                <QuestionType type={type} index={index} />
            </div>
            <div className="d-flex flex-column gap-2">
                <FormQuestion index={index} title={title} description={description} isPreview={isPreview} />
                <FormAnswer index={index}  isPreview={isPreview} type={type} answers={question.answers} />
            </div>
        </div>
    );
};
