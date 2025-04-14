import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FormBlock } from "../form-block/form-block";
import { useFormQuestion } from "./use-form-questions";
import { ManagementPanel } from "../management-panel/management-panel";
import { FormManagement } from "../form-management/form-management";
import { useFormContext } from "../../contexts/form-context/use-form-context";

export const FormQuestions = () => {
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
    } = useFormQuestion();
    const { isEdit } = useFormContext();

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
                            <FormBlock
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
            {isEdit && (
                <ManagementPanel>
                    <FormManagement onDelete={onDelete} onAdd={onAdd} />
                </ManagementPanel>
            )}
        </>
    );
};
