import { FC, ReactElement, useState } from "react";
import { LoadingContext } from ".";

type Props = {
    children: ReactElement;
};

export const LoadingContextProvider: FC<Props> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = () => {
        setIsLoading(true);
    };

    const stopLoading = () => {
        setIsLoading(false);
    };

    return (
        <LoadingContext.Provider
            value={{ isLoading, startLoading, stopLoading }}
        >
            {children}
        </LoadingContext.Provider>
    );
};
