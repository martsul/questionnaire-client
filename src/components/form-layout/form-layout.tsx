import classNames from "classnames";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";

export const FormLayout = () => {
    const { formId } = useParams();
    const { language } = useLanguage();
    const words = dictionary[language].form;

    return (
        <section>
            <nav className="nav nav-pills nav-fill my-3">
                <NavLink
                    className={({ isActive }) =>
                        classNames("nav-item nav-link", { active: isActive })
                    }
                    end
                    to={`/form/${formId}`}
                >
                    {words.form}
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        classNames("nav-item nav-link", { active: isActive })
                    }
                    to={"answers"}
                >
                    {words.answers}
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        classNames("nav-item nav-link", { active: isActive })
                    }
                    to={"statistic"}
                >
                    {words.statistic}
                </NavLink>
            </nav>
            <Outlet />
        </section>
    );
};
