import { AxiosError } from "axios";

export const getErrorData = (error: unknown) => {
    if (error instanceof AxiosError) {
        return {
            message: error.response?.data,
            status: error.response?.status,
        };
    }
    return { message: "unknown", status: NaN };
};
