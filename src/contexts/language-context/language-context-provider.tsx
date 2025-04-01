import { FC, ReactElement, useState } from "react";
import { LanguageContext } from ".";
import { AvailableLanguages } from "../../types/available-languages";
import { ToggleLanguage } from "../../types/toggle-language";

type Props = {
    children: ReactElement;
};

export const LanguageContextProvider: FC<Props> = ({ children }) => {
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
