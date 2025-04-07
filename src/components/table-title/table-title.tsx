import { ChangeEventHandler, FC } from "react";
import { InputSearch } from "../input-search/input-search";

type Props = {
    title: string;
    handlerChange: ChangeEventHandler<HTMLInputElement>;
};

export const TableTitle: FC<Props> = ({ title, handlerChange }) => {
    return (
        <div className="d-flex align-items-center gap-4 justify-content-between border-bottom pb-4">
            <h1 className="fs-2">{title}</h1>
            <div>
                <InputSearch handlerChange={handlerChange} />
            </div>
        </div>
    );
};
