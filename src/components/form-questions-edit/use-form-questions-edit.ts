import { useState } from "react";
import {
    setQuestions,
    selectQuestions,
    addQuestion,
    toggleStatistic,
    selectEditData,
    selectHead,
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
import { convertImg } from "../../helpers/convert-img";
import { useApi } from "../../hooks/use-api";
import { endpoints } from "../../constants/config";
import { getForm } from "../../redux/entities/forms/get-forms";
import { useAuthorization } from "../../contexts/authorization-context/use-authorization";

export const useFormQuestionEdit = () => {
    const dispatch = useAppDispatch();
    const formData = useAppSelector(selectEditData);
    const headData = useAppSelector(selectHead);
    const questions = useAppSelector(selectQuestions);
    const { userData } = useAuthorization();
    const request = useApi();
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

    const onSubmit = async () => {
        const img = await convertImg(formData?.img);
        const responseData = { ...formData, img };
        const response = await request(
            "put",
            endpoints.form,
            true,
            responseData
        );
        if (!(response instanceof Error) && headData?.id) {
            await dispatch(
                getForm({ formId: headData.id, userId: userData?.id })
            );
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
        onSubmit,
    };
};
