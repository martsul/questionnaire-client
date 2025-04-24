import { FC, useCallback, useState } from "react";
import { LoadingContext } from ".";
import { ProviderProps } from "../../types/provider-props";

export const LoadingContextProvider: FC<ProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = useCallback(() => {
        setIsLoading(true);
    }, []);

    const stopLoading = useCallback(() => {
        setIsLoading(false);
    }, []);

    return (
        <LoadingContext.Provider
            value={{ isLoading, startLoading, stopLoading }}
        >
            {children}
        </LoadingContext.Provider>
    );
};
