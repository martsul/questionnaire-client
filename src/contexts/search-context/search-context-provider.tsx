import { FC, useState } from "react";
import { SearchContext } from ".";
import { ProviderProps } from "../../types/provider-props";
import { debounce } from "lodash";
import { simpleApi } from "../../api";
import { endpoints } from "../../constants/config";
import { FoundedForm } from "../../types/founded-form";
import { ApiResponse } from "../../types/api-response";
import { OnSearchForm } from "../../types/on-search-form";

export const SearchContextProvider: FC<ProviderProps> = ({ children }) => {
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [foundedForms, setFoundedForms] = useState<FoundedForm[]>([]);

    const searchForm: OnSearchForm = async (value, searchBy) => {
        try {
            const result: ApiResponse<FoundedForm[]> = await simpleApi.get(
                endpoints.searchForm,
                { params: { word: value, searchBy } }
            );
            setFoundedForms(result.data);
        } catch (error) {
            console.error(error);
        }
    };

    const debounceSearchForm = debounce(searchForm, 100);

    const onSearch: OnSearchForm = (value, searchBy) => {
        setSearchValue(value);
        debounceSearchForm(value, searchBy);
    };

    const onHide = () => {
        setModalActive(false);
        setSearchValue("");
    };

    return (
        <SearchContext.Provider
            value={{
                modalActive,
                setModalActive,
                searchValue,
                onSearch,
                foundedForms,
                onHide,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};
