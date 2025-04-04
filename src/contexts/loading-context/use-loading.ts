import { useContext } from "react";
import { LoadingContext } from ".";

export const useLoading = () => {
    const result = useContext(LoadingContext);
    if (result === null) {
        throw new Error("Loading Context Error!");
    }
    return result;
};
