import { Dropdown } from "react-bootstrap";
import styles from "./search.module.css";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { InputSearch } from "../input-search/input-search";

export const Search = () => {
    const searchResult = [1];
    const { language } = useLanguage();
    const words = dictionary[language].header;

    const handlerChange = () => {}

    return (
        <Dropdown className={styles.dropdown}>
            <Dropdown.Toggle variant="link">
                <InputSearch handlerChange={handlerChange} />
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdownMenu}>
                {searchResult.map((e, ind) => (
                    <Dropdown.Item key={ind}>{e}</Dropdown.Item>
                ))}
                {!searchResult.length && (
                    <p className="m-0 text-center text-secondary-emphasis">{words.noResult}</p>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};


