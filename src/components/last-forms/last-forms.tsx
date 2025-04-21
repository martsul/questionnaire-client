import { Swiper, SwiperSlide } from "swiper/react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { Pagination } from "swiper/modules";

export const LastForms = () => {
    const { language } = useLanguage();
    const words = dictionary[language].homePage;

    return (
        <section>
            <h2 className="mb-5">{words.lastForms}</h2>
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
                <SwiperSlide>
                    <Link to={"/"} className="text-decoration-none">
                        <Card className="bg-body-secondary">
                            <Card.Img></Card.Img>
                            <Card.Body>
                                <Card.Title>Title</Card.Title>
                                <Card.Text>OwnerName</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Card className="bg-body-secondary">
                        <Card.Img></Card.Img>
                        <Card.Body>
                            <Card.Title>Title</Card.Title>
                            <Card.Text>OwnerName</Card.Text>
                        </Card.Body>
                    </Card>
                </SwiperSlide>
                <SwiperSlide>
                    <Card className="bg-body-secondary">
                        <Card.Img></Card.Img>
                        <Card.Body>
                            <Card.Title>Title</Card.Title>
                            <Card.Text>OwnerName</Card.Text>
                        </Card.Body>
                    </Card>
                </SwiperSlide>
                <SwiperSlide>
                    <Card className="bg-body-secondary">
                        <Card.Img></Card.Img>
                        <Card.Body>
                            <Card.Title>Title</Card.Title>
                            <Card.Text>OwnerName</Card.Text>
                        </Card.Body>
                    </Card>
                </SwiperSlide>
                <SwiperSlide>
                    <Card className="bg-body-secondary">
                        <Card.Img></Card.Img>
                        <Card.Body>
                            <Card.Title>Title</Card.Title>
                            <Card.Text>OwnerName</Card.Text>
                        </Card.Body>
                    </Card>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};
