import { useNavigate } from "react-router-dom";
import { api } from "../../../api";
import { endpoints } from "../../../constants/config";
import { useAuthorization } from "../../../contexts/authorization-context/use-authorization";
import { useApi } from "../../../hooks/use-api";
import {
    selectHead,
    toggleLike,
} from "../../../redux/entities/form/form-slice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

export const useFormHeadDetails = () => {
    const dispatch = useAppDispatch();
    const { userData } = useAuthorization();
    const headData = useAppSelector(selectHead);
    const request = useApi();
    const navigate = useNavigate();

    const onLike = () => {
        if (userData) {
            api.post(endpoints.like, {  
                formId: headData?.id,
                isLiked: headData?.isLiked,
            });
            dispatch(toggleLike());
        }
    };

    const onDelete = async () => {
        const result = await request("delete", endpoints.form, true, {
            ids: [headData?.id],
        });
        if (!(result instanceof Error)) {
            navigate("/");
        }
    };

    return {
        onLike,
        onDelete,
    };
};
