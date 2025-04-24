import { Form, Table } from "react-bootstrap";
import { useTableOwnForms } from "./use-table-own-forms";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { Link } from "react-router-dom";
import styles from "./table-own-forms.module.css";
import { FilterColumn } from "../filter-column/filter-column";

export const TableOwnForms = () => {
    const {
        forms,
        onSort,
        allSelected,
        selectAllForms,
        selectedForms,
        toggleSelectForm,
        onDelete,
        onAdd,
    } = useTableOwnForms();
    const { language } = useLanguage();
    const words = dictionary[language].profile;

    return (
        <>
            <div className="d-flex w-100 justify-content-end align-items-center gap-2">
                <button onClick={onDelete}>
                    <i className="bi bi-trash"></i>
                </button>
                <button onClick={onAdd}>
                    <i className="bi bi-plus-lg"></i>
                </button>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th className={styles.check + " " + styles.mainCheck}>
                            <Form.Check
                                checked={allSelected}
                                onChange={selectAllForms}
                            />
                        </th>
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
                            <td className={styles.check}>
                                <Form.Check
                                    onChange={() => {
                                        toggleSelectForm(f.id);
                                    }}
                                    checked={selectedForms.has(f.id)}
                                />
                            </td>
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
        </>
    );
};
