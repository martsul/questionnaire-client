import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ThemeButton } from "../theme-button/theme-button";
import { LanguageButton } from "../language-button/language-button";
import { User } from "../user/user";
import { Search } from "../search/search";

export const Header = () => {
    return (
        <header className="bg-body-secondary py-3">
            <Container>
                <div className="d-flex justify-content-between align-items-center gap-2">
                    <Link to={""}>
                        <i className="bi bi-house-fill fs-5"></i>
                    </Link>
                    <Search />
                    <div className="d-flex align-items-center gap-1 gap-sm-4">
                        <div className="d-flex gap-0 gap-sm-1 align-items-center">
                            <LanguageButton />
                            <ThemeButton />
                        </div>
                        <User />
                    </div>
                </div>
            </Container>
        </header>
    );
};
