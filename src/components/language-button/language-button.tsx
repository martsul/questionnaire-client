import { Dropdown, DropdownButton } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";

export const LanguageButton = () => {
    const { toggleLanguage } = useLanguage();

    return (
        <DropdownButton
            variant="link"
            title={<i className="fs-sm-5 fs-6 bi bi-translate"></i>}
        >
            <Dropdown.Item onClick={() => toggleLanguage("en")}>
                English
            </Dropdown.Item>
            <Dropdown.Item onClick={() => toggleLanguage("es")}>
                Spanish
            </Dropdown.Item>
        </DropdownButton>
    );
};
