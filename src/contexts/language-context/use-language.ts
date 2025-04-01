import { useContext } from "react";
import { LanguageContext } from ".";

export const useLanguage = () => {
    const result = useContext(LanguageContext);

    if (result === null) {
        throw new Error("Language Context Error");
    }

    return result;
};
