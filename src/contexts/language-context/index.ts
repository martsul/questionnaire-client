import { createContext } from "react";
import { AvailableLanguages } from "../../types/available-languages";
import { ToggleLanguage } from "../../types/toggle-language";

type Value = {
    language: AvailableLanguages;
    toggleLanguage: ToggleLanguage;
};

export const LanguageContext = createContext<null | Value>(null);
