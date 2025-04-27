import Chart from "react-google-charts";
import { useStatistic } from "./use-statistic";
import { useStatisticStyles } from "../../hooks/use-statistic-styles";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { PageTitle } from "../page-title/page-title";

export const Statistic = () => {
    const { answers } = useStatistic();
    const styles = useStatisticStyles();
    const { language } = useLanguage();
    const { titles } = dictionary[language];

    return (
        <>
        <PageTitle title={titles.statistic} />
            <div className="d-flex flex-column gap-5">
                {Object.entries(answers).map((q) => {
                    const statisticHead = [
                        "Answer",
                        "Count",
                        { role: "style" },
                    ];
                    const statisticBody = q[1].map((a) => [
                        a.answer,
                        +a.answerCount,
                        "#0d6efd",
                    ]);
                    const statisticData = [statisticHead, ...statisticBody];

                    return (
                        <div key={q[0]}>
                            <h3>{q[1][0].Question.title}</h3>
                            <Chart
                                chartType="ColumnChart"
                                width="100%"
                                height="100%"
                                options={styles}
                                data={statisticData}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};
