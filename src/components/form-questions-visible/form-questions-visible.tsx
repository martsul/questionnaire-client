import { selectQuestions } from "../../redux/entities/forms/forms-slice";
import { useAppSelector } from "../../redux/hooks";
import { FormAnswerVisible } from "../form-answer-visible/form-answer-visible";
import { FormQuestionVisible } from "../form-question-visible/form-question-visible";

export const FormQuestionsVisible = () => {
    const questions = useAppSelector(selectQuestions);

    return (
        <>
            {questions.map((q) => (
                <div key={q.id} className="bg-body-secondary p-4 rounded d-flex flex-column gap-3">
                    <FormQuestionVisible
                        title={q.title}
                        description={q.description}
                        inStatistic={q.inStatistic}
                    />
                    <FormAnswerVisible answers={q.answers} type={q.type} />
                </div>
            ))}
        </>
    );
};
