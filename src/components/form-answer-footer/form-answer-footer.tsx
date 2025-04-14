import { FC } from "react";

type Props = {
    handlerAddAnswer: () => void;
    handlerDeleteAnswer: () => void;
};

export const FormAnswerFooter: FC<Props> = ({
    handlerAddAnswer,
    handlerDeleteAnswer,
}) => {
    return (
        <div className="d-flex align-items-center justify-content-end gap-2">
            <button type="button" onClick={handlerAddAnswer}>
                <i className="bi bi-plus-lg"></i>
            </button>
            <button type="button" onClick={handlerDeleteAnswer}>
                <i className="bi bi-trash"></i>
            </button>
        </div>
    );
};
