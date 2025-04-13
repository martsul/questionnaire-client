import { ChangeEventHandler, useState } from "react";
import { simpleApi } from "../../../api";
import { endpoints } from "../../../constants/config";
import { debounce } from "lodash";

export const useFormHeadTheme = () => {
    const [availableThemes, setAvailableThemes] = useState<string[]>([]);

    const sendToServer = async (value: string) => {
        try {
            const response = await simpleApi.get(endpoints.theme, {
                params: { theme: value },
            });
            setAvailableThemes(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const debouncedSendData = debounce(sendToServer, 100);

    const onChangeTag: ChangeEventHandler<HTMLInputElement> = async (event) => {
        const value = event.target.value;
        debouncedSendData(value);
    };

    return {
        availableThemes,
        onChangeTag,
    };
};
