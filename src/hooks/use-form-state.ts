import { useState, } from "react";

export const useFormState = () => {
    const [isEdit, setIsEdit] = useState(false);

    const toggleEdit = () => setIsEdit((prev) => !prev);

    return {
        isEdit,
        toggleEdit,
    };
};
