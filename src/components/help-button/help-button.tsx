import { dictionary } from "../../constants/dictionary";
import { useLanguage } from "../../contexts/language-context/use-language";
import { useState } from "react";
import { HelpModal } from "../help-modal/help-modal";

export const HelpButton = () => {
    const { language } = useLanguage();
    const { help } = dictionary[language];
    const [show, setShow] = useState(false);

    const onHidden = () => {
        setShow(!show);
    };

    return (
        <>
            <button onClick={() => setShow(!show)}>{help.help}</button>
            <HelpModal show={show} onHidden={onHidden} />
        </>
    );
};
