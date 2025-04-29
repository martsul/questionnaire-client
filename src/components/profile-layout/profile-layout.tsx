import classNames from "classnames";
import { NavLink, Outlet } from "react-router-dom";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { PageTitle } from "../page-title/page-title";

export const ProfileLayout = () => {
    const { language } = useLanguage();
    const { titles, profile } = dictionary[language];

    return (
        <>
            <PageTitle title={titles.profile} />
            <section>
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
                <Outlet />
            </section>
        </>
    );
};
