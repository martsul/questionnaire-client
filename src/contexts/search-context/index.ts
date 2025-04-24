import { createContext } from "react";
import { FoundedForm } from "../../types/founded-form";
import { OnSearchForm } from "../../types/on-search-form";

type Value = {
    modalActive: boolean;
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
    searchValue: string;
    onSearch: OnSearchForm;
    foundedForms: FoundedForm[];
    onHide: () => void;
};

export const SearchContext = createContext<Value | null>(null);
