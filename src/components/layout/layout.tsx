import { Outlet } from "react-router-dom";
import { Header } from "../header/header";
import { Message } from "../message/message";

export const Layout = () => {
    return (
        <>
            <Message />
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
};
