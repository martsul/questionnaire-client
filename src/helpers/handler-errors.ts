import { AxiosError } from "axios";
import { dictionary } from "../constants/dictionary";
import { AvailableErrors } from "../types/available-errors";
import { AvailableLanguages } from "../types/available-languages";

export const handlerErrors = (
    error: unknown,
    language: AvailableLanguages
): string => {
    const { errors } = dictionary[language];
    if (!(error instanceof AxiosError)) return errors.unknown;
    const errorData = error.response?.data.split(",")[0];
    return errorData in errors
        ? errors[errorData as AvailableErrors]
        : errors.unknown;
};
