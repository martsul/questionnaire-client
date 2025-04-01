import { useContext } from "react";
import { ThemeContext } from ".";

export const useTheme = () => {
    const result = useContext(ThemeContext);

    if (result === null) {
        throw new Error("Theme Context Error");
    }

    return result;
};
