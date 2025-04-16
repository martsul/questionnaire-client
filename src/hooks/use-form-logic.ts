import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useApi } from "./use-api";
import { endpoints } from "../constants/config";
import { getForm } from "../redux/entities/forms/get-forms";
import {
    selectEditData,
    selectHead,
    toggleLike,
} from "../redux/entities/forms/forms-slice";
import { convertImg } from "../helpers/convert-img";
import { useAuthorization } from "../contexts/authorization-context/use-authorization";
import { simpleApi } from "../api";

export const useFormLogic = () => {
    const dispatch = useAppDispatch();
    const headData = useAppSelector(selectHead);
    const request = useApi();
    const formData = useAppSelector(selectEditData);
    const [isEdit, setIsEdit] = useState(false);
    const { userData } = useAuthorization();

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

    const onSubmit = async () => {
        const img = await convertImg(formData?.img);
        const responseData = { ...formData, img };
        const response = await request(
            "put",
            endpoints.form,
            true,
            responseData
        );
        if (!(response instanceof Error)) {
            if (headData?.id) {
                await dispatch(
                    getForm({ formId: headData.id, userId: userData?.id })
                );
            }
        }
    };

    return {
        toggleEdit,
        isEdit,
        onSubmit,
        onLike,
    };
};
