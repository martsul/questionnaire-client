import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getForm } from "../../redux/entities/form/get-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthorization } from "../../contexts/authorization-context/use-authorization";
import { selectFormStatus } from "../../redux/entities/form/form-slice";
import { useLoading } from "../../contexts/loading-context/use-loading";
import { FormLayout } from "./form-layout";

export const FormLayoutContainer = () => {
    const dispatch = useAppDispatch();
    const formId = +(useParams().formId as string);
    const { userData } = useAuthorization();
    const requestStatus = useAppSelector(selectFormStatus);
    const { startLoading, stopLoading } = useLoading();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getForm({ formId, userId: userData?.id }));
    }, [dispatch, formId, userData?.id]);

    useEffect(() => {
        if (requestStatus === "fulfilled") {
            stopLoading();
        }
    }, [requestStatus, stopLoading]);

    if (requestStatus === "pending" || requestStatus === "idle") {
        startLoading();
        return null;
    }

    if (requestStatus === "rejected") {
        navigate("/");
        return null;
    }

    return <FormLayout />;
};
