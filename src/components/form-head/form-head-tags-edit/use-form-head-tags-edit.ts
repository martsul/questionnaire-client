import { useState } from "react";
import { simpleApi } from "../../../api";
import { endpoints } from "../../../constants/config";
import { debounce } from "lodash";
import { useAppDispatch } from "../../../redux/hooks";
import { ApiResponse } from "../../../types/api-response";
import { setTags } from "../../../redux/entities/form/form-slice";
import { SelectValue } from "../../../types/select-value";
import { MultiValue } from "react-select";

const getTags = async (value: string) => {
    const response: ApiResponse<string[]> = await simpleApi.get(endpoints.tag, {
        params: { tag: value },
    });
    return response;
};

const formatAvailableTags = (tags: string[], value: string) => {
    if (value) {
        return [
            ...tags.map((tag) => ({ value: tag, label: tag })),
            { value, label: value },
        ];
    }
    return [...tags.map((tag) => ({ value: tag, label: tag }))];
};

export const useFormHeadTagsEdit = () => {
    const [availableTags, setAvailableTags] = useState<
        { value: string; label: string }[]
    >([]);
    const dispatch = useAppDispatch();

    const getAvailableTags = async (value: string) => {
        try {
            const tags = await getTags(value);
            const formattedTags = formatAvailableTags(tags.data, value);
            setAvailableTags(formattedTags);
        } catch (error) {
            console.error(error);
        }
    };

    const debouncedSendData = debounce(getAvailableTags, 100);

    const onChangeTag = (value: string) => {
        debouncedSendData(value);
    };

    const handlerSetTags = (tags: MultiValue<SelectValue>) => {
        dispatch(setTags(tags));
    };

    return {
        availableTags,
        onChangeTag,
        handlerSetTags,
    };
};
