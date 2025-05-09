import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";

export const ProfileNav = () => {
    const { language } = useLanguage();
    const { profile } = dictionary[language];

    return (
        <nav className="nav nav-pills nav-fill my-3">
            <NavLink
                className={({ isActive }) =>
                    classNames("nav-item nav-link", {
                        active: isActive,
                    })
                }
                end
                to={``}
            >
                {profile.forms}
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    classNames("nav-item nav-link", {
                        active: isActive,
                    })
                }
                to={"answers"}
            >
                {profile.answers}
            </NavLink>
        </nav>
    );
};
