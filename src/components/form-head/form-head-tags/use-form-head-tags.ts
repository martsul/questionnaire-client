import { ChangeEventHandler, useState } from "react";
import { simpleApi } from "../../../api";
import { endpoints } from "../../../constants/config";
import { debounce } from "lodash";
import { useAppDispatch } from "../../../redux/hooks";
import { addTag, deleteTag } from "../../../redux/entities/form/form-slice";

export const useFormHeadTags = () => {
    const [availableTags, setAvailableTags] = useState<string[]>([]);
    const dispatch = useAppDispatch()

    const sendTagToServer = async (value: string) => {
        try {
            const response = await simpleApi.get(endpoints.tag, {
                params: { tag: value },
            });
            setAvailableTags(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const debouncedSendData = debounce(sendTagToServer, 100);

    const onChangeTag: ChangeEventHandler<HTMLInputElement> = async (event) => {
        const value = event.target.value;
        debouncedSendData(value);
    };

    const handlerAddTag = (tag: string) => {
        dispatch(addTag(tag))
    };

    const handlerDeleteTag = (tag: string) => {
        dispatch(deleteTag(tag))
    };

    const handlerEnter: React.KeyboardEventHandler<HTMLInputElement> = (
        event
    ) => {
        if (event.key === "Enter") {
            handlerAddTag(event.currentTarget.value);
            event.currentTarget.value = "";
        }
    };

    return {
        availableTags,
        onChangeTag,
        handlerDeleteTag,
        handlerEnter
    };
};
