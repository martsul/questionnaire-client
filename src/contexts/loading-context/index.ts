import { createContext } from "react";

type Value = {
    isLoading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
};

export const LoadingContext = createContext<Value | null>(null);
