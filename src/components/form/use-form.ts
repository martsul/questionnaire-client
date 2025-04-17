import { useEffect, useState } from "react";
import { selectHead, toggleLike } from "../../redux/entities/forms/forms-slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useAuthorization } from "../../contexts/authorization-context/use-authorization";
import { simpleApi } from "../../api";
import { endpoints } from "../../constants/config";
import { getForm } from "../../redux/entities/forms/get-forms";
import { selectAnswers } from "../../redux/entities/answers/answers-slice";
import { useApi } from "../../hooks/use-api";
import { useMessage } from "../../contexts/message-context/use-message-context";

export const useForm = () => {
    const dispatch = useAppDispatch();
    const answers = useAppSelector(selectAnswers);
    const headData = useAppSelector(selectHead);
    const [isEdit, setIsEdit] = useState(false);
    const { userData } = useAuthorization();
    const { addMessage } = useMessage();
    const request = useApi();

    const onSubmit = async () => {
        const requestData = {
            answers,
            formId: headData?.id,
            userId: userData?.id,
        };
        const result = await request(
            "post",
            endpoints.answer,
            true,
            requestData
        );
        if (!(result instanceof Error)) addMessage("success", "ok");
    };

    const onLike = () => {
        simpleApi.post(endpoints.like, {
            formId: headData?.id,
            userId: userData?.id,
            isLiked: headData?.isLiked,
        });
        dispatch(toggleLike());
    };

    const toggleEdit = () => setIsEdit(!isEdit);

    useEffect(() => {
        if (!isEdit && headData?.id) {
            dispatch(getForm({ formId: headData.id, userId: userData?.id }));
        }
    }, [isEdit, headData?.id, dispatch, userData?.id]);

    return {
        toggleEdit,
        isEdit,
        onLike,
        onSubmit,
    };
};
