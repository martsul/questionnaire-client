import { useEffect, useMemo, useState } from "react";
import { useApi } from "../../hooks/use-api";
import { endpoints } from "../../constants/config";
import { useAuthorization } from "../../contexts/authorization-context/use-authorization";
import { OwnForm } from "../../types/own-form";
import { sortObjects } from "../../helpers/sort-objects";
import { useNavigate } from "react-router-dom";

export const useTableOwnForms = () => {
    const request = useApi();
    const navigate = useNavigate();
    const [forms, setForms] = useState<OwnForm[]>([]);
    const { userData } = useAuthorization();
    const [isAscending, setIsAscending] = useState<boolean>(false);
    const [allSelected, setAllSelected] = useState<boolean>(false);
    const [selectedForms, setSelectedForms] = useState<Set<number>>(new Set());
    const formsIds = useMemo(() => {
        return forms.map((f) => f.id);
    }, [forms]);

    useEffect(() => {
        request<OwnForm[]>("get", endpoints.ownForms, true).then((response) => {
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

    const toggleSelectForm = (id: number) => {
        const tempForms = new Set(selectedForms);
        if (selectedForms.has(id)) {
            tempForms.delete(id);
        } else {
            tempForms.add(id);
        }
        setSelectedForms(tempForms);
    };

    const selectAllForms = () => {
        if (allSelected) {
            setSelectedForms(new Set());
        } else {
            setSelectedForms(new Set(formsIds));
        }
        setAllSelected(!allSelected);
    };

    const onDelete = async () => {
        await request("delete", endpoints.form, true, {
            ids: Array.from(selectedForms),
        });
        const forms = await request<OwnForm[]>(
            "get",
            endpoints.ownForms,
            true
        );
        if (!(forms instanceof Error)) {
            setForms(forms);
        }
    };

    const onAdd = async () => {
        const result = await request<{ id: number }>(
            "post",
            endpoints.form,
            true,
            { ownerId: userData?.id }
        );
        if (!(result instanceof Error)) {
            navigate(`/form/${result.id}`);
        }
    };

    return {
        forms,
        onSort,
        selectAllForms,
        allSelected,
        toggleSelectForm,
        selectedForms,
        onDelete,
        onAdd,
    };
};
