import { useState } from "react";
import {
    setQuestions,
    selectQuestions,
    addQuestion,
    toggleStatistic,
} from "../../redux/entities/form/form-slice";
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
import { EditData } from "../../types/form/edit-data";
import { Question } from "../../types/form/question";
import { AnswerError } from "../../errors/answer-error";
import { selectEditData } from "../../redux/entities/form/selectors";
import { useMessage } from "../../contexts/message-context/use-message-context";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";

const validateQuestions = (questions: Question[]) => {
    questions.forEach((q) => {
        if (
            Array.isArray(q.answers) &&
            q.answers.length !== new Set(q.answers).size
        ) {
            throw new AnswerError(q.title);
        }
    });
};

const getRequestData = async (data?: EditData) => {
    if (data) {
        const img = await convertImg(data.img);
        validateQuestions(data.questions);
        return { ...data, img };
    }
    throw new Error("No Data");
};

export const useFormQuestionEdit = () => {
    const dispatch = useAppDispatch();
    const editData = useAppSelector(selectEditData);
    const questions = useAppSelector(selectQuestions);
    const request = useApi();
    const [editQuestion, setEditQuestion] = useState("");
    const { addMessage } = useMessage();
    const { language } = useLanguage();
    const { errors } = dictionary[language];
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
        try {
            const requestData = await getRequestData(editData);
            await request("put", endpoints.form, true, requestData);
        } catch (error) {
            if (error instanceof Error) {
                addMessage("danger", errors.uniqueAnswers + error.message);
            }
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
