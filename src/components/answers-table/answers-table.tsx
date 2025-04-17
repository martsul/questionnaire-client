import { Table } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { useNavigate } from "react-router-dom";
import styles from "./answers-table.module.css";
import { useAnswersTable } from "./use-answers-table";
import { formatDate } from "../../helpers/format-date";

export const AnswersTable = () => {
    const navigate = useNavigate();
    const { language } = useLanguage();
    const words = dictionary[language].answers;
    const { answers, toggleASC } = useAnswersTable();

    return (
        <div className={styles.container}>
            <Table className="my-5">
                <thead>
                    <tr>
                        <th>
                            <button onClick={() => {toggleASC("resultId")}} className={styles.button}>
                                <span>{words.id}</span>
                                <i
                                    className={
                                        "bi bi-arrow-down-short " + styles.arrow
                                    }
                                ></i>
                            </button>
                        </th>
                        <th>
                            <button onClick={() => {toggleASC("name")}} className={styles.button}>
                                <span>{words.name}</span>
                                <i
                                    className={
                                        "bi bi-arrow-down-short " + styles.arrow
                                    }
                                ></i>
                            </button>
                        </th>
                        <th>
                            <button onClick={() => {toggleASC("email")}} className={styles.button}>
                                <span>{words.email}</span>
                                <i
                                    className={
                                        "bi bi-arrow-down-short " + styles.arrow
                                    }
                                ></i>
                            </button>
                        </th>
                        <th>
                            <button onClick={() => {toggleASC("createdAt")}} className={styles.button}>
                                <span>{words.time}</span>
                                <i
                                    className={
                                        "bi bi-arrow-down-short " + styles.arrow
                                    }
                                ></i>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {answers.map((a) => {
                        return (
                            <tr
                                key={a.resultId}
                                className={styles.row}
                                onClick={() =>
                                    navigate(`/answer/${a.resultId}`)
                                }
                            >
                                <th>{a.resultId}</th>
                                <th>{a.name}</th>
                                <th>{a.email}</th>
                                <th>{formatDate(a.createdAt)}</th>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};
