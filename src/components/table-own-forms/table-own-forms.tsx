import { Table } from "react-bootstrap";
import { useTableOwnForms } from "./use-table-own-forms";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { Link } from "react-router-dom";
import styles from "./table-own-forms.module.css";
import { FilterColumn } from "../filter-column/filter-column";

export const TableOwnForms = () => {
    const { forms, onSort } = useTableOwnForms();
    const { language } = useLanguage();
    const words = dictionary[language].profile;

    return (
        <Table>
            <thead>
                <tr>
                    <FilterColumn
                        onSort={() => {
                            onSort("id");
                        }}
                        text={words.id}
                    />
                    <FilterColumn
                        onSort={() => {
                            onSort("title");
                        }}
                        text={words.title}
                    />
                    <FilterColumn
                        onSort={() => {
                            onSort("isPublic");
                        }}
                        text={words.public}
                    />
                    <th className={styles.link}></th>
                </tr>
            </thead>
            <tbody>
                {forms.map((f) => (
                    <tr key={f.id}>
                        <td>{f.id}</td>
                        <td>{f.title}</td>
                        <td>{f.isPublic ? words.public : words.private}</td>
                        <td className={styles.link}>
                            <Link to={`/form/${f.id}`}>
                                <i className="bi bi-box-arrow-up-right"></i>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};
