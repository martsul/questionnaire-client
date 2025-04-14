import { FC } from "react";
import { useFormState } from "../../hooks/use-form-state";
import { useFormLogic } from "../../hooks/use-form-logic";
import { ProviderProps } from "../../types/provider-pops";
import { FormContext } from ".";

export const FormContextProvider: FC<ProviderProps> = ({ children }) => {
    const { isEdit, toggleEdit } = useFormState();
    const { register, handleSubmit, watch, onSubmit } = useFormLogic();

    return (
        <FormContext.Provider
            value={{
                onSubmit: handleSubmit(onSubmit),
                register,
                watch,
                toggleEdit,
                isEdit,
            }}
        >
            {children}
        </FormContext.Provider>
    );
};
