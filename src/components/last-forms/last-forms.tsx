import { Swiper, SwiperSlide } from "swiper/react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { Pagination } from "swiper/modules";
import { useAppSelector } from "../../redux/hooks";
import { selectLastForms } from "../../redux/entities/home-page/home-page-slice";
import styles from "./last-forms.module.css";

export const LastForms = () => {
    const { language } = useLanguage();
    const { homePage } = dictionary[language];
    const lastForm = useAppSelector(selectLastForms);

    return (
        <section>
            <h2 className="mb-4">{homePage.lastForms}</h2>
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
                            <Card
                                className={`bg-body-secondary ${styles.card}`}
                            >
                                <Card.Img
                                    className={styles.img}
                                    src={
                                        f.img ||
                                        "https://res.cloudinary.com/dx0xkmpsq/image/upload/fl_preserve_transparency/v1745678523/drilldown_euccrj.jpg?_s=public-apps"
                                    }
                                />
                                <Card.Body>
                                    <Card.Title className={styles.title}>
                                        {f.title || homePage.noTitle}
                                    </Card.Title>
                                    <Card.Text className={styles.creator}>
                                        {f.creator}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};
