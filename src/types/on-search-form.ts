import { SearchByForm } from "./search-by-form";

export type OnSearchForm = (
    value: string,
    searchBy?: SearchByForm
) => void | Promise<void>;
