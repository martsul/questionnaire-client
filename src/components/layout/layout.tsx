import { Outlet } from "react-router-dom";
import { Header } from "../header/header";
import { Message } from "../message/message";
import { Loader } from "../loader/loader";

export const Layout = () => {
    return (
        <>
            <Loader/>
            <Message />
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
};
