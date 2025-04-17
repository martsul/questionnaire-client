import { FC } from "react";

type Props = {
    onDelete: () => void;
    onAdd: () => void;
    onStatistic: (inStatistic: boolean) => void;
    onSubmit: () => void
};

export const FormManagement: FC<Props> = ({ onDelete, onAdd, onStatistic,onSubmit }) => {

    return (
        <>
            <button type="button" onClick={onSubmit}>
                <i className="bi bi-check-lg"></i>
            </button>
            <button
                type="button"
                onClick={() => {
                    onAdd();
                }}
            >
                <i className="bi bi-plus-lg"></i>
            </button>
            <button type="button" onClick={onDelete}>
                <i className="bi bi-trash"></i>
            </button>
            <button
                onClick={() => {
                    onStatistic(true);
                }}
            >
                <i className="bi bi-people-fill"></i>
            </button>
            <button
                onClick={() => {
                    onStatistic(false);
                }}
            >
                <i className="bi bi-incognito"></i>
            </button>
        </>
    );
};
