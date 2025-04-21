import { Table } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { Link } from "react-router-dom";
import styles from "./answers-table.module.css";
import { useAnswersTable } from "./use-answers-table";
import { parseISO, format } from "date-fns";

export const AnswersTable = () => {
    const { language } = useLanguage();
    const words = dictionary[language].answers;
    const { answers, toggleASC } = useAnswersTable();

    return (
        <div className={styles.container}>
            <Table className="">
                <thead>
                    <tr>
                        <th>
                            <button
                                onClick={() => {
                                    toggleASC("resultId");
                                }}
                                className={styles.button}
                            >
                                <span>{words.id}</span>
                                <i
                                    className={
                                        "bi bi-arrow-down-short " + styles.arrow
                                    }
                                ></i>
                            </button>
                        </th>
                        <th>
                            <button
                                onClick={() => {
                                    toggleASC("name");
                                }}
                                className={styles.button}
                            >
                                <span>{words.name}</span>
                                <i
                                    className={
                                        "bi bi-arrow-down-short " + styles.arrow
                                    }
                                ></i>
                            </button>
                        </th>
                        <th>
                            <button
                                onClick={() => {
                                    toggleASC("email");
                                }}
                                className={styles.button}
                            >
                                <span>{words.email}</span>
                                <i
                                    className={
                                        "bi bi-arrow-down-short " + styles.arrow
                                    }
                                ></i>
                            </button>
                        </th>
                        <th>
                            <button
                                onClick={() => {
                                    toggleASC("createdAt");
                                }}
                                className={styles.button}
                            >
                                <span>{words.time}</span>
                                <i
                                    className={
                                        "bi bi-arrow-down-short " + styles.arrow
                                    }
                                ></i>
                            </button>
                        </th>
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
                                    <Link
                                        target="_blank"
                                        to={`/answer/${a.resultId}`}
                                    >
                                        <i className="bi bi-box-arrow-up-right"></i>
                                    </Link>
                                </th>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};
