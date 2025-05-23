import { FC, useState } from "react";
import { LanguageContext } from ".";
import { AvailableLanguages } from "../../types/available-languages";
import { ToggleLanguage } from "../../types/toggle-language";
import { ProviderProps } from "../../types/provider-props";

export const LanguageContextProvider: FC<ProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<AvailableLanguages>(
        (localStorage.getItem("language") as AvailableLanguages) || "en"
    );

    const toggleLanguage: ToggleLanguage = (language) => {
        setLanguage(language);
        localStorage.setItem("language", language)
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
