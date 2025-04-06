import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./user.module.css";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import classNames from "classnames";
import { useTheme } from "../../contexts/theme-context/use-theme";
import { useAuthorization } from "../../contexts/authorization-context/use-authorization";
import { useLogout } from "../../hooks/use-logout";

export const User = () => {
    const { userData } = useAuthorization();
    const { language } = useLanguage();
    const { theme } = useTheme();
    const words = dictionary[language].header;
    const { handlerLogout } = useLogout();

    return (
        <>
            {!userData && (
                <Link
                    to={"login"}
                    className={classNames(
                        "text-nowrap btn d-flex gap-2 align-items-center",
                        { "btn-outline-light": theme === "dark" },
                        { "btn-outline-dark": theme === "light" }
                    )}
                >
                    <span className="d-none d-sm-inline">{words.login}</span>
                    <i className="bi bi-box-arrow-in-right"></i>
                </Link>
            )}
            {userData && (
                <DropdownButton
                    className={styles.dropdown}
                    variant="link"
                    title={<i className="fs-3 bi bi-person-circle"></i>}
                >
                    {userData.isAdmin && (
                        <Link className="dropdown-item" to={"admin"}>
                            {words.adminPanel}
                        </Link>
                    )}
                    <Link className="dropdown-item" to={"profile"}>
                        {words.profile}
                    </Link>
                    <Dropdown.Item onClick={handlerLogout}>
                        {words.logout}
                    </Dropdown.Item>
                </DropdownButton>
            )}
        </>
    );
};
