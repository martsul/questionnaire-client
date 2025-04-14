import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useApi } from "./use-api";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { imgInFile } from "../helpers/img-in-file";
import { FormData } from "../types/form/form-data";
import { fileToBase64 } from "../helpers/file-to-base-64";
import { endpoints } from "../constants/config";
import { getForm } from "../redux/entities/form/get-form";
import { selectEditData, selectImg } from "../redux/entities/form/form-slice";

export const useFormLogic = () => {
    const dispatch = useAppDispatch();
    const img = useAppSelector(selectImg);
    const request = useApi();
    const { register, handleSubmit, watch, reset } = useForm<FormData>();
    const formData = useAppSelector(selectEditData);

    useEffect(() => {
        const initializeForm = async () => {
            const imgFile = await imgInFile(img);

            reset({
                img: imgFile,
            });
        };

        initializeForm();
    }, [img, reset]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const img = await fileToBase64(data.img[0]);
        const requestData = { img, ...formData };
        await request("put", endpoints.form, true, requestData);
        await dispatch(getForm(formData?.formId as number));
    };

    return {
        register,
        handleSubmit,
        watch,
        onSubmit,
    };
};
