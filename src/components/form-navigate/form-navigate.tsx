import { NavLink, useParams } from "react-router-dom";
import { dictionary } from "../../constants/dictionary";
import { useLanguage } from "../../contexts/language-context/use-language";
import classNames from "classnames";

export const FormNavigate = () => {
    const { formId } = useParams();
    const { language } = useLanguage();
    const words = dictionary[language].form;

    return (
        <nav className="nav nav-pills nav-fill my-3">
            <NavLink
                className={({ isActive }) =>
                    classNames("nav-item nav-link", {
                        active: isActive,
                    })
                }
                end
                to={`/form/${formId}`}
            >
                {words.form}
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    classNames("nav-item nav-link", {
                        active: isActive,
                    })
                }
                to={"answers"}
            >
                {words.answers}
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    classNames("nav-item nav-link", {
                        active: isActive,
                    })
                }
                to={"statistic"}
            >
                {words.statistic}
            </NavLink>
        </nav>
    );
};
