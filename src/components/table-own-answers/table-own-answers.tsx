import { Form, Table } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { useTableOwnAnswers } from "./use-table-own-answers";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import styles from "./table-own-answers.module.css";
import { FilterColumn } from "../filter-column/filter-column";

export const TableOwnAnswers = () => {
    const { language } = useLanguage();
    const words = dictionary[language].profile;
    const {
        answers,
        onSort,
        onDelete,
        selectAllAnswers,
        selectAnswer,
        selectedAnswers,
        allSelected,
    } = useTableOwnAnswers();

    return (
        <>
            <div className="d-flex w-100 justify-content-end">
                <button onClick={onDelete}>
                    <i className="bi bi-trash"></i>
                </button>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th className={styles.check + " " + styles.mainCheck}>
                            <Form.Check
                                checked={allSelected}
                                onChange={selectAllAnswers}
                            />
                        </th>
                        <FilterColumn
                            onSort={() => {
                                onSort("answerId");
                            }}
                            text={words.answerId}
                        />
                        <FilterColumn
                            onSort={() => {
                                onSort("formId");
                            }}
                            text={words.formId}
                        />
                        <FilterColumn
                            onSort={() => {
                                onSort("title");
                            }}
                            text={words.title}
                        />
                        <FilterColumn
                            onSort={() => {
                                onSort("createdAt");
                            }}
                            text={words.createdAt}
                        />
                        <th className={styles.link}></th>
                    </tr>
                </thead>
                <tbody>
                    {answers.map((a) => {
                        const date = parseISO(a.createdAt);
                        const formattedDate = format(
                            date,
                            "yyyy-MM-dd HH:mm:ss"
                        );

                        return (
                            <tr key={a.answerId}>
                                <td className={styles.check}>
                                    <Form.Check
                                        onChange={() => {
                                            selectAnswer(a.answerId);
                                        }}
                                        checked={selectedAnswers.has(a.answerId)}
                                    />
                                </td>
                                <td>{a.answerId}</td>
                                <td>{a.formId}</td>
                                <td>{a.title}</td>
                                <td>{formattedDate}</td>
                                <td className={styles.link}>
                                    <Link to={`/answer/${a.answerId}`}>
                                        <i className="bi bi-box-arrow-up-right"></i>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
};
