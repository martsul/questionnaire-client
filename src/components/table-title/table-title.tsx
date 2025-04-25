import { FC } from "react";
import { InputSearch } from "../input-search/input-search";

type Props = {
    title: string;
    onChange: (value: string) => void;
};

export const TableTitle: FC<Props> = ({ title, onChange }) => {
    return (
        <div className="d-flex align-items-center gap-4 justify-content-between border-bottom pb-4">
            <h1 className="fs-2">{title}</h1>
            <div>
                <InputSearch onChange={onChange} />
            </div>
        </div>
    );
};
