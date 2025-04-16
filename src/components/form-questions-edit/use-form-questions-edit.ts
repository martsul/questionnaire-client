import { useState } from "react";
import {
    setQuestions,
    selectQuestions,
    addQuestion,
    toggleStatistic,
} from "../../redux/entities/forms/forms-slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export const useFormQuestionEdit = () => {
    const questions = useAppSelector(selectQuestions);
    const dispatch = useAppDispatch();
    const [editQuestion, setEditQuestion] = useState("");
    const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(
        new Set()
    );
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = questions.findIndex((q) => q.id === active.id);
            const newIndex = questions.findIndex((q) => q.id === over.id);
            const newOrder = arrayMove(questions, oldIndex, newIndex);
            dispatch(setQuestions(newOrder));
        }
    };

    const onDelete = () => {
        const filteredQuestions = questions.filter(
            (q) => !selectedQuestions.has(q.id)
        );
        dispatch(setQuestions(filteredQuestions));
    };

    const onAdd = () => {
        dispatch(addQuestion());
    };

    const onStatistic = (inStatistic: boolean) => {
        dispatch(
            toggleStatistic({
                inStatistic,
                questions: Array.from(selectedQuestions),
            })
        );
    };

    return {
        onStatistic,
        sensors,
        editQuestion,
        setEditQuestion,
        selectedQuestions,
        setSelectedQuestions,
        handleDragEnd,
        questions,
        onDelete,
        onAdd,
    };
};
