import { Table } from "react-bootstrap";
import { dictionary } from "../../constants/dictionary";
import { useLanguage } from "../../contexts/language-context/use-language";
import { Link } from "react-router-dom";
import styles from "./popular-forms.module.css";
import { useAppSelector } from "../../redux/hooks";
import { selectPopularForms } from "../../redux/entities/home-page/home-page-slice";

export const PopularForms = () => {
    const { language } = useLanguage();
    const words = dictionary[language].homePage;
    const popularForms = useAppSelector(selectPopularForms);

    return (
        <section className="mb-4">
            <h2 className="mb-4">{words.popularForm}</h2>
            <div className="overflow-auto">
                <Table>
                    <thead>
                        <tr>
                            <th className="text-nowrap">{words.id}</th>
                            <th className="text-nowrap">{words.title}</th>
                            <th className="text-nowrap">{words.creator}</th>
                            <th className="text-nowrap">
                                {words.numberResponse}
                            </th>
                            <th className={styles.link}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {popularForms.map((f) => (
                            <tr key={f.id}>
                                <th>{f.id}</th>
                                <th>{f.title}</th>
                                <th>{f.creator}</th>
                                <th>{f.numberResponse}</th>
                                <th className={styles.link}>
                                    <Link to={`/form/${f.id}`}>
                                        <i className="bi bi-box-arrow-up-right"></i>
                                    </Link>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </section>
    );
};
