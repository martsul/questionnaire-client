import {
    changeHeadDescription,
    changeHeadTitle,
    setImg,
} from "../../../redux/entities/form/form-slice";
import { useAppDispatch } from "../../../redux/hooks";

export const useFormHeadTitleEdit = () => {
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

    const deleteImg = () => {
        dispatch(setImg(""));
    };

    return {
        handlerChangeTitle,
        handlerChangeDescription,
        handlerFileChange,
        deleteImg,
    };
};
