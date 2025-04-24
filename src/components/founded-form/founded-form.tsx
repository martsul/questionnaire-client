import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./founded-form.module.css";
import { useSearch } from "../../contexts/search-context/use-search";

type Props = {
    id: number;
    title: string;
    coincidence: string;
};

export const FoundedForm: FC<Props> = ({ coincidence, id, title }) => {
    const {setModalActive} = useSearch()

    return (
        <Link
            className={
                "bg-body-secondary d-flex flex-column p-2 rounded border border-secondary " +
                styles.link
            }
            onClick={() => setModalActive(false)}
            to={`/form/${id}`}
        >
            <span className="fs-5">{title}</span>
            <span dangerouslySetInnerHTML={{ __html: coincidence }}/>
        </Link>
    );
};
