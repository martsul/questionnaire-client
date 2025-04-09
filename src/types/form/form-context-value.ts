import { BaseSyntheticEvent } from "react";
import { FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";

export type FormContextValue = {
    register: UseFormRegister<FieldValues>;
    onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
    watch: UseFormWatch<FieldValues>
    toggleEdit: () => void;
    togglePublic: () => void;
    isEdit: boolean;
    isPublic: boolean;
};
