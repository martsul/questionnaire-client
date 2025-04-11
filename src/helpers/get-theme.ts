import { AvailableLanguages } from "../types/available-languages";

export const getTheme = (
    theme: string | undefined,
    language: AvailableLanguages
) => {
    if (!theme) {
        return language === "en" ? "education" : "educación";
    } else if (
        theme === "education" ||
        theme === "educación" ||
        theme === "quiz" ||
        theme === "cuestionario"
    ) {
        return theme;
    }
    return "other";
};
