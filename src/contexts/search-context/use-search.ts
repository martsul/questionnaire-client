import { useContext } from "react";
import { SearchContext } from ".";

export const useSearch = () => {
    const result = useContext(SearchContext);

    if (result === null) {
        throw new Error("Search Context Error");
    }

    return result;
};
