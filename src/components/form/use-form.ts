import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectAnswers } from "../../redux/entities/answers/answers-slice";
import { selectHead, selectUsers } from "../../redux/entities/form/form-slice";
import { endpoints } from "../../constants/config";
import { useApi } from "../../hooks/use-api";
import { useAuthorization } from "../../contexts/authorization-context/use-authorization";
import { useMessage } from "../../contexts/message-context/use-message-context";
import { getForm } from "../../redux/entities/form/get-form";

export const useForm = () => {
    const dispatch = useAppDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const answers = useAppSelector(selectAnswers);
    const formHead = useAppSelector(selectHead);
    const request = useApi();
    const { userData } = useAuthorization();
    const { addMessage } = useMessage();
    const users = useAppSelector(selectUsers);
    const canSendAnswer = Boolean(
        !isEdit &&
            userData &&
            (formHead?.isPublic ||
                userData.isAdmin ||
                userData.id === formHead?.ownerId ||
                users.find((u) => u.id === userData.id))
    );
    const canEdit = Boolean(
        userData?.id === formHead?.ownerId || userData?.isAdmin
    );

    const onSubmit = async () => {
        const requestData = {
            answers,
            formId: formHead?.id,
        };
        const result = await request(
            "post",
            endpoints.answer,
            true,
            requestData
        );
        if (!(result instanceof Error)) addMessage("success", "ok");
    };

    const toggleEdit = () => {
        setIsEdit(!isEdit);
        if (isEdit && formHead?.id) {
            dispatch(getForm({ formId: formHead.id, userId: userData?.id }));
        }
    };

    return { toggleEdit, onSubmit, isEdit, canSendAnswer, canEdit };
};
