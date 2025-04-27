import { Table } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { Link } from "react-router-dom";
import styles from "./answers-table.module.css";
import { useAnswersTable } from "./use-answers-table";
import { parseISO, format } from "date-fns";
import classNames from "classnames";
import { FilterColumn } from "../filter-column/filter-column";
import { PageTitle } from "../page-title/page-title";

export const AnswersTable = () => {
    const { language } = useLanguage();
    const { answers: words, titles } = dictionary[language];
    const { answers, onSort } = useAnswersTable();


    return (
        <>
            <PageTitle title={titles.answers} />
            <div className={classNames({ "overflow-auto": answers.length })}>
                <Table>
                    <thead>
                        <tr>
                            <FilterColumn
                                text={words.id}
                                onSort={() => onSort("resultId")}
                            />
                            <FilterColumn
                                text={words.name}
                                onSort={() => onSort("name")}
                            />
                            <FilterColumn
                                text={words.email}
                                onSort={() => onSort("email")}
                            />
                            <FilterColumn
                                text={words.time}
                                onSort={() => onSort("createdAt")}
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
                                <tr key={a.resultId}>
                                    <th>{a.resultId}</th>
                                    <th>{a.name}</th>
                                    <th>{a.email}</th>
                                    <th>{formattedDate}</th>
                                    <th className={styles.link}>
                                        <Link to={`/answer/${a.resultId}`}>
                                            <i className="bi bi-box-arrow-up-right"></i>
                                        </Link>
                                    </th>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    );
};
