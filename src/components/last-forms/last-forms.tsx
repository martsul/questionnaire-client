import { Swiper, SwiperSlide } from "swiper/react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { Pagination } from "swiper/modules";
import { useAppSelector } from "../../redux/hooks";
import { selectLastForms } from "../../redux/entities/home-page/home-page-slice";

export const LastForms = () => {
    const { language } = useLanguage();
    const words = dictionary[language].homePage;
    const lastForm = useAppSelector(selectLastForms);

    return (
        <section>
            <h2 className="mb-4">{words.lastForms}</h2>
            <Swiper
                modules={[Pagination]}
                className="pb-5"
                pagination={{ clickable: true }}
                spaceBetween={50}
                slidesPerView={1}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    991: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 40,
                    },
                }}
            >
                {lastForm.map((f) => (
                    <SwiperSlide key={f.id}>
                        <Link
                            to={`/form/${f.id}`}
                            className="text-decoration-none"
                        >
                            <Card className="bg-body-secondary">
                                {f.img && <Card.Img src={f.img} />}
                                <Card.Body>
                                    {!f.img && (
                                        <Card.Text>{f.description}</Card.Text>
                                    )}
                                    <Card.Title>{f.title}</Card.Title>
                                    <Card.Text>{f.creator}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};
