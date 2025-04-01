import { Dropdown, Form, InputGroup } from "react-bootstrap";
import styles from "./search.module.css";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";

export const Search = () => {
    const searchResult = [1];
    const { language } = useLanguage();
    const words = dictionary[language].header;

    return (
        <Dropdown className={styles.dropdown}>
            <Dropdown.Toggle variant="link">
                <InputSearch />
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

const InputSearch = () => {
    const { language } = useLanguage();
    const words = dictionary[language].header;

    return (
        <InputGroup>
            <InputGroup.Text>
                <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control placeholder={words.search} />
        </InputGroup>
    );
};
