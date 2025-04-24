import { Modal } from "react-bootstrap";
import { useSearch } from "../../contexts/search-context/use-search";
import { InputSearch } from "../input-search/input-search";
import styles from "./modal-search.module.css";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { FoundedForm } from "../founded-form/founded-form";

export const ModalSearch = () => {
    const { language } = useLanguage();
    const words = dictionary[language].search;
    const { modalActive, onSearch, searchValue, onHide, foundedForms } =
        useSearch();

    return (
        <Modal onHide={onHide} show={modalActive}>
            <Modal.Header
                className="d-flex gap-2 align-items-center"
                closeButton
            >
                <InputSearch
                    value={searchValue}
                    onChange={(value: string) => onSearch(value)}
                />
            </Modal.Header>
            <Modal.Body className={styles.body}>
                {!foundedForms.length && (
                    <div className="d-flex flex-column w-100 h-100 justify-content-center align-items-center gap-2 py-5">
                        <i className={"bi bi-search " + styles.search}></i>
                        <span className="fs-4">{words.noResults}</span>
                    </div>
                )}
                {Boolean(foundedForms.length) && (
                    <div className="d-flex flex-column gap-2">
                        {foundedForms.map((f) => (
                            <FoundedForm
                                key={f.id}
                                id={f.id}
                                coincidence={f.coincidence}
                                title={f.title}
                            />
                        ))}
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};
