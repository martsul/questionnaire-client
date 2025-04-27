import { useEffect } from "react";
import { selectRequestStatus } from "../../redux/entities/home-page/home-page-slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Home } from "./home";
import { getHomePage } from "../../redux/entities/home-page/get-home-page";
import { useLoading } from "../../contexts/loading-context/use-loading";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { PageTitle } from "../page-title/page-title";

export const HomeContainer = () => {
    const dispatch = useAppDispatch();
    const requestStatus = useAppSelector(selectRequestStatus);
    const { startLoading, stopLoading } = useLoading();
    const { language } = useLanguage();
    const titles = dictionary[language].titles;

    useEffect(() => {
        dispatch(getHomePage());
    }, [dispatch]);

    useEffect(() => {
        if (requestStatus === "idle" || requestStatus === "pending") {
            startLoading();
        } else {
            stopLoading();
        }
    }, [requestStatus, startLoading, stopLoading]);

    if (requestStatus === "idle" || requestStatus === "pending") {
        return null;
    }

    return (
        <>
            <PageTitle  title={titles.home}/>
            <Home />
        </>
    );
};
