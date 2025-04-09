import { FC, useState } from "react";
import { LoadingContext } from ".";
import { ProviderProps } from "../../types/provider-pops";

export const LoadingContextProvider: FC<ProviderProps> = ({ children }) => {
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
