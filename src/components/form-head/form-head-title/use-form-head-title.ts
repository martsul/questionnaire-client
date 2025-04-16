import {
    changeHeadDescription,
    changeHeadTitle,
    setImg,
} from "../../../redux/entities/forms/forms-slice";
import { useAppDispatch } from "../../../redux/hooks";

export const useFormHeadTitle = () => {
    const dispatch = useAppDispatch();

    const handlerChangeTitle = (value: string) => {
        dispatch(changeHeadTitle(value));
    };

    const handlerChangeDescription = (value: string) => {
        dispatch(changeHeadDescription(value));
    };

    const handlerFileChange = (files: FileList | null) => {
        if (files) {
            dispatch(setImg(URL.createObjectURL(files[0])));
        }
    };

    return { handlerChangeTitle, handlerChangeDescription, handlerFileChange };
};
