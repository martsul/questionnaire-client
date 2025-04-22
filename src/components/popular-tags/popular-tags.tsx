import { Button } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { useAppSelector } from "../../redux/hooks";
import { selectPopularTags } from "../../redux/entities/home-page/home-page-slice";

export const PopularTags = () => {
    const { language } = useLanguage();
    const words = dictionary[language].homePage;
    const popularTags = useAppSelector(selectPopularTags);

    return (
        <section>
            <h2 className="mb-4">{words.popularTags}</h2>
            <div className="d-flex gap-3 flex-wrap">
                {popularTags.map((t) => (
                    <Button className="px-2 py-1" key={t.id}>
                        {t.tag}
                    </Button>
                ))}
            </div>
        </section>
    );
};
