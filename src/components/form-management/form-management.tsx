import { FC } from "react";
import { TooltipButton } from "../tooltip-button/tooltip-button";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";

type Props = {
    onDelete: () => void;
    onAdd: () => void;
    onStatistic: (inStatistic: boolean) => void;
    onSubmit: () => void;
};

export const FormManagement: FC<Props> = ({
    onDelete,
    onAdd,
    onStatistic,
    onSubmit,
}) => {
    const { language } = useLanguage();
    const { tooltips } = dictionary[language];

    return (
        <>
            <TooltipButton
                onClick={() => {
                    onSubmit();
                }}
                text={tooltips.save}
            >
                <i className="bi bi-check-lg"></i>
            </TooltipButton>
            <TooltipButton
                onClick={() => {
                    onAdd();
                }}
                text={tooltips.addQuestion}
            >
                <i className="bi bi-plus-lg"></i>
            </TooltipButton>
            <TooltipButton
                onClick={() => {
                    onDelete();
                }}
                text={tooltips.deleteQuestions}
            >
                <i className="bi bi-trash"></i>
            </TooltipButton>
            <TooltipButton
                onClick={() => {
                    onStatistic(true);
                }}
                text={tooltips.publicResponse}
            >
                <i className="bi bi-people-fill"></i>
            </TooltipButton>
            <TooltipButton
                onClick={() => {
                    onStatistic(false);
                }}
                text={tooltips.confidentialResponse}
            >
                <i className="bi bi-incognito"></i>
            </TooltipButton>
        </>
    );
};
