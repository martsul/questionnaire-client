import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./user.module.css";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";

export const User = () => {
    const isAuthorized = false;
    const { language } = useLanguage();
    const words = dictionary[language].header;

    return (
        <>
            {!isAuthorized && (
                <Link
                    to={"/login"}
                    className="text-nowrap btn btn-outline-light d-flex gap-2 align-items-center"
                >
                    <span className="d-none d-sm-inline">{words.login}</span>
                    <i className="bi bi-box-arrow-in-right"></i>
                </Link>
            )}
            {isAuthorized && (
                <DropdownButton
                    className={styles.dropdown}
                    variant="link"
                    title={<i className="fs-3 bi bi-person-circle"></i>}
                >
                    <Link className="dropdown-item" to={"profile"}>
                        {words.profile}
                    </Link>
                    <Dropdown.Item>{words.logout}</Dropdown.Item>
                </DropdownButton>
            )}
        </>
    );
};
