import { Outlet } from "react-router-dom";
import { Header } from "../header/header";
import { Message } from "../message/message";
import { Loader } from "../loader/loader";
import { Container } from "react-bootstrap";
import { useCheckAuthorization } from "../../hooks/use-check-authorization";
import { useEffect, useState } from "react";

export const Layout = () => {
    const { checkAuthorization } = useCheckAuthorization();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        (async () => {
            await checkAuthorization();
            setLoading(false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Loader />
            <Message />
            <Header />
            <main className="my-5">
                <Container>{!loading && <Outlet />}</Container>
            </main>
        </>
    );
};
