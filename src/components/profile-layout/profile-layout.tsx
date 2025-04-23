import classNames from "classnames";
import { NavLink, Outlet } from "react-router-dom";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";

export const ProfileLayout = () => {
    const { language } = useLanguage();
    const words = dictionary[language].profile;

    return (
        <section className="overflow-auto">
            <nav className="nav nav-pills nav-fill my-3">
                <NavLink
                    className={({ isActive }) =>
                        classNames("nav-item nav-link", { active: isActive })
                    }
                    end
                    to={``}
                >
                    {words.forms}
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        classNames("nav-item nav-link", { active: isActive })
                    }
                    to={"answers"}
                >
                    {words.answers}
                </NavLink>
            </nav>
            <Outlet />
        </section>
    );
};
