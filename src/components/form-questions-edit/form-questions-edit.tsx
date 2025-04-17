import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FormQuestionBlockEdit } from "../form-question-block-edit/form-question-block-edit";
import { useFormQuestionEdit } from "./use-form-questions-edit";
import { ManagementPanel } from "../management-panel/management-panel";
import { FormManagement } from "../form-management/form-management";

export const FormQuestionsEdit = () => {
    const {
        editQuestion,
        handleDragEnd,
        selectedQuestions,
        sensors,
        setEditQuestion,
        setSelectedQuestions,
        questions,
        onAdd,
        onDelete,
        onStatistic,
        onSubmit,
    } = useFormQuestionEdit();

    return (
        <>
            <div className="w-100 overflow-hidden d-flex flex-column gap-4">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={questions}
                        strategy={verticalListSortingStrategy}
                    >
                        {questions.map((q) => (
                            <FormQuestionBlockEdit
                                active={editQuestion === q.id}
                                setEditQuestion={setEditQuestion}
                                isSelected={selectedQuestions.has(q.id)}
                                setSelectedQuestions={setSelectedQuestions}
                                key={q.id}
                                question={q}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
            <ManagementPanel>
                <FormManagement
                    onSubmit={onSubmit}
                    onDelete={onDelete}
                    onAdd={onAdd}
                    onStatistic={onStatistic}
                />
            </ManagementPanel>
        </>
    );
};
