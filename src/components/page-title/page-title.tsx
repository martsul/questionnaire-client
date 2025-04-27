import { FC, useEffect } from "react";

type Props = {
    title: string;
};

export const PageTitle: FC<Props> = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [title])

    return null;
};
