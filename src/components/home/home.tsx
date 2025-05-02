import { useNavigate } from "react-router-dom";
import { dictionary } from "../../constants/dictionary";
import { useAuthorization } from "../../contexts/authorization-context/use-authorization";
import { useLanguage } from "../../contexts/language-context/use-language";
import { useApi } from "../../hooks/use-api";
import { endpoints } from "../../constants/config";
import { Button } from "react-bootstrap";
import { LastForms } from "../last-forms/last-forms";
import { PopularForms } from "../popular-forms/popular-forms";
import { PopularTags } from "../popular-tags/popular-tags";
import { useAppSelector } from "../../redux/hooks";
import { selectLastForms } from "../../redux/entities/home-page/home-page-slice";
import { LastFormEmpty } from "../last-forms-empty/last-forms-empty";

export const Home = () => {
    const { language } = useLanguage();
    const words = dictionary[language].homePage;
    const { userData } = useAuthorization();
    const request = useApi();
    const navigate = useNavigate();
    const lastForms = useAppSelector(selectLastForms);

    const createForm = async () => {
        const result = await request<{ id: number }>(
            "post",
            endpoints.form,
            true,
            {
                ownerId: userData?.id,
            }
        );
        if (!(result instanceof Error)) {
            navigate(`/form/${result.id}`);
        }
    };

    return (
        <>
            {userData && (
                <Button onClick={createForm} className="mb-4 w-100">
                    {words.createForm}
                </Button>
            )}
            {lastForms.length && <LastForms />}
            {!lastForms.length && <LastFormEmpty createForm={createForm} />}
            <PopularForms />
            <PopularTags />
        </>
    );
};
