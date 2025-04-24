import { InputSearch } from "../input-search/input-search";
import { ModalSearch } from "../modal-search/modal-search";
import { useSearch } from "../../contexts/search-context/use-search";

export const Search = () => {
    const { setModalActive } = useSearch();

    return (
        <>
            <div
                onClick={() => {
                    setModalActive(true);
                }}
            >
                <InputSearch />
            </div>
            <ModalSearch />
        </>
    );
};
