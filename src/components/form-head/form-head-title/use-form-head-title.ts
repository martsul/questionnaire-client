import {
    changeHeadDescription,
    changeHeadTitle,
} from "../../../redux/entities/form/form-slice";
import { useAppDispatch } from "../../../redux/hooks";

export const useFormHeadTitle = () => {
    const dispatch = useAppDispatch();

    const handlerChangeTitle = (value: string) => {
        dispatch(changeHeadTitle(value));
    };

    const handlerChangeDescription = (value: string) => {
        dispatch(changeHeadDescription(value));
    };

    return { handlerChangeTitle, handlerChangeDescription };
};
