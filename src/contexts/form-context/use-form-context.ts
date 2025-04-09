import { useContext } from "react";
import { FormContext } from ".";

export const useFormContext = () => {
    const result = useContext(FormContext);
    if (result === null) {
        throw new Error("Form Context Error");
    }
    return result;
};
