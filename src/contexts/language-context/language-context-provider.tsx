import { FC, useState } from "react";
import { LanguageContext } from ".";
import { AvailableLanguages } from "../../types/available-languages";
import { ToggleLanguage } from "../../types/toggle-language";
import { ProviderProps } from "../../types/provider-pops";

export const LanguageContextProvider: FC<ProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<AvailableLanguages>("en");

    const toggleLanguage: ToggleLanguage = (language) => {
        setLanguage(language);
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
