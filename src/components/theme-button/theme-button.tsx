import { useTheme } from "../../contexts/theme-context/use-theme";

export const ThemeButton = () => {
    const { toggleTheme, theme } = useTheme();

    return (
        <button className="btn-link" onClick={toggleTheme}>
            {theme === "light" && <i className="fs-sm-5 fs-6 bi bi-brightness-high"></i>}
            {theme === "dark" && <i className="fs-sm-5 fs-6 bi bi-moon"></i>}
        </button>
    );
};
