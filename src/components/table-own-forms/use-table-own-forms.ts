import { useEffect, useState } from "react";
import { useApi } from "../../hooks/use-api";
import { endpoints } from "../../constants/config";
import { useAuthorization } from "../../contexts/authorization-context/use-authorization";
import { OwnForm } from "../../types/own-form";
import { sortObjects } from "../../helpers/sort-objects";

export const useTableOwnForms = () => {
    const request = useApi();
    const [forms, setForms] = useState<OwnForm[]>([]);
    const { userData } = useAuthorization();
    const [isAscending, setIsAscending] = useState<boolean>(true);

    useEffect(() => {
        request<OwnForm[]>("get", endpoints.ownForms, true, {
            ownerId: userData?.id,
        }).then((response) => {
            if (!(response instanceof Error)) {
                setForms(response);
            }
        });
    }, [request, userData?.id]);

    const onSort = (sortField: keyof OwnForm) => {
        const tempForms = [...forms];
        const sortedForms = sortObjects(
            tempForms,
            sortField,
            isAscending
        ) as OwnForm[];
        setForms(sortedForms);
        setIsAscending(!isAscending);
    };

    return { forms, onSort };
};
