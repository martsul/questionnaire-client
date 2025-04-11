import { ChangeEventHandler, FC, useEffect, useState } from "react";
import { ProviderProps } from "../../types/provider-pops";
import { FormContext } from ".";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useApi } from "../../hooks/use-api";
import { endpoints } from "../../constants/config";
import { fileToBase64 } from "../../helpers/file-to-base-64";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectFormData } from "../../redux/entities/form/form-slice";
import { FormData } from "../../types/form/form-data";
import { imgInFile } from "../../helpers/img-in-file";
import { getForm } from "../../redux/entities/form/get-form";
import { getTheme } from "../../helpers/get-theme";
import { useLanguage } from "../language-context/use-language";
import { debounce } from "lodash";
import { simpleApi } from "../../api";

export const FormContextProvider: FC<ProviderProps> = ({ children }) => {
    const formData = useAppSelector(selectFormData);
    const [isEdit, setIsEdit] = useState(false);
    const [isPublic, setIsPublic] = useState(true);
    const request = useApi();
    const dispatch = useAppDispatch();
    const { language } = useLanguage();
    const { register, handleSubmit, watch, reset } = useForm<FormData>();
    const formId = +(useParams().formId as string);
    const [availableTags, setAvailableTags] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            const imgFile = await imgInFile(formData?.head.img);
            const theme = getTheme(formData?.head.Theme.theme, language);
            const ownTheme =
                theme === "other" ? formData?.head.Theme.theme : "";

            reset({
                title: formData?.head.title,
                description: formData?.head.description,
                theme,
                ownTheme,
                img: imgFile,
            });
        })();
    }, [reset, formData, language]);

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

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const img = await fileToBase64(data.img[0]);
        const requestData = { ...data, isPublic, img, formId };
        await request("put", endpoints.form, true, requestData);
        await dispatch(getForm(formId)).unwrap();
        setIsEdit(false);
    };

    const toggleEdit = () => {
        setIsEdit(!isEdit);
    };
    const togglePublic = () => {
        setIsPublic(!isPublic);
    };

    return (
        <FormContext.Provider
            value={{
                onSubmit: handleSubmit(onSubmit),
                register,
                watch,
                toggleEdit,
                togglePublic,
                isEdit,
                isPublic,
                onChangeTag,
                availableTags,
            }}
        >
            {children}
        </FormContext.Provider>
    );
};
