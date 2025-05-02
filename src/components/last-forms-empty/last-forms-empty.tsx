import { useNavigate } from "react-router-dom";
import { dictionary } from "../../constants/dictionary";
import { useAuthorization } from "../../contexts/authorization-context/use-authorization";
import { useLanguage } from "../../contexts/language-context/use-language";
import styles from "./last-forms-empty.module.css";
import { FC } from "react";

type Props = {
    createForm: () => void;
};

export const LastFormEmpty: FC<Props> = ({ createForm }) => {
    const { language } = useLanguage();
    const { homePage } = dictionary[language];
    const { userData } = useAuthorization();
    const navigate = useNavigate();

    const handlerClick = () => {
        if (!userData) {
            navigate("/login");
        } else {
            createForm();
        }
    };

    return (
        <section className="mb-4">
            <h2 className="mb-4">{homePage.lastForms}</h2>
            <div className="d-flex justify-content-center">
                <button
                    onClick={handlerClick}
                    className={
                        "rounded border border-secondary " + styles.button
                    }
                >
                    <i className="bi bi-plus-circle fs-1"></i>
                </button>
            </div>
        </section>
    );
};
