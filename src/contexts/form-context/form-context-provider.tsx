import { FC } from "react";
import { useFormLogic } from "../../hooks/use-form-logic";
import { ProviderProps } from "../../types/provider-pops";
import { FormContext } from ".";

export const FormContextProvider: FC<ProviderProps> = ({ children }) => {
    const { onSubmit, isEdit, toggleEdit, onLike } = useFormLogic();

    return (
        <FormContext.Provider value={{ onLike, onSubmit, toggleEdit, isEdit }}>
            {children}
        </FormContext.Provider>
    );
};
