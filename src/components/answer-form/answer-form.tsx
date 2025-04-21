import { FormQuestionsVisible } from "../form-questions-visible/form-questions-visible";

export const AnswerForm = () => {
    return (
        <section className="d-flex flex-column gap-4">
            <FormQuestionsVisible disabled={true} />
        </section>
    );
};
