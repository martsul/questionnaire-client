import { FC, useEffect, useState } from "react";
import { ProviderProps } from "../../types/provider-pops";
import { FormContext } from ".";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useApi } from "../../hooks/use-api";
import { endpoints } from "../../constants/config";
import { fileToBase64 } from "../../helpers/file-to-base-64";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    selectHead,
    selectTags,
    selectUsers,
} from "../../redux/entities/form/form-slice";
import { FormData } from "../../types/form/form-data";
import { imgInFile } from "../../helpers/img-in-file";
import { getForm } from "../../redux/entities/form/get-form";
import { getTheme } from "../../helpers/get-theme";
import { useLanguage } from "../language-context/use-language";
import { TagsState } from "../../types/form/tags-state";
import { UsersState } from "../../types/users-state";
import { convertStateTags } from "../../helpers/convert-state-tags";

export const FormContextProvider: FC<ProviderProps> = ({ children }) => {
    const formHead = useAppSelector(selectHead);
    const request = useApi();
    const dispatch = useAppDispatch();
    const { language } = useLanguage();
    const { register, handleSubmit, watch, reset } = useForm<FormData>();
    const formId = +(useParams().formId as string);
    const [isEdit, setIsEdit] = useState(false);
    const [isPublic, setIsPublic] = useState(true);
    const tags = useAppSelector(selectTags) as TagsState;
    const users = useAppSelector(selectUsers) as UsersState;

    useEffect(() => {
        (async () => {
            const imgFile = await imgInFile(formHead?.img);
            const theme = getTheme(formHead?.Theme.theme, language);
            const ownTheme = theme === "other" ? formHead?.Theme.theme : "";
            setIsPublic(formHead?.isPublic || false);

            reset({
                title: formHead?.title,
                description: formHead?.description,
                img: imgFile,
                theme,
                ownTheme,
            });
        })();
    }, [reset, formHead, language]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const img = await fileToBase64(data.img[0]);
        const convertedTags = convertStateTags(tags);
        const requestData = {
            ...data,
            isPublic,
            img,
            formId,
            users,
            tags: convertedTags,
        };
        await request("put", endpoints.form, true, requestData);
        await dispatch(getForm(formId));
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
            }}
        >
            {children}
        </FormContext.Provider>
    );
};
