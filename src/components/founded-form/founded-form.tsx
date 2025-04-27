import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./founded-form.module.css";
import { useSearch } from "../../contexts/search-context/use-search";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";

type Props = {
    id: number;
    title: string;
    coincidence: string;
};

export const FoundedForm: FC<Props> = ({ coincidence, id, title }) => {
    const { setModalActive } = useSearch();
    const { language } = useLanguage();
    const { search } = dictionary[language];

    return (
        <Link
            className={
                "bg-body-secondary d-flex flex-column p-2 rounded border border-secondary " +
                styles.link
            }
            onClick={() => setModalActive(false)}
            to={`/form/${id}`}
        >
            <span className="fs-5">{title || search.noTitle}</span>
            <span dangerouslySetInnerHTML={{ __html: coincidence }} />
        </Link>
    );
};
