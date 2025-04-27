import { FC } from "react";
import { selectQuestions } from "../../redux/entities/form/form-slice";
import { useAppSelector } from "../../redux/hooks";
import { FormAnswerVisible } from "../form-answer-visible/form-answer-visible";
import { FormQuestionVisible } from "../form-question-visible/form-question-visible";

type Props = {
    disabled?: boolean;
};

export const FormQuestionsVisible: FC<Props> = ({ disabled = false }) => {
    const questions = useAppSelector(selectQuestions);
    
    return (
        <>
            {questions.map((q) => (
                <div
                    key={q.id}
                    className="bg-body-secondary p-4 rounded d-flex flex-column gap-3"
                >
                    <FormQuestionVisible
                        title={q.title}
                        description={q.description}
                        inStatistic={q.inStatistic}
                    />
                    <FormAnswerVisible
                        id={q.id}
                        answers={q.answers}
                        type={q.type}
                        disabled={disabled}
                    />
                </div>
            ))}
        </>
    );
};
