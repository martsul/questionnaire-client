import { FormContainer } from "../components/form/form-container";
import { FormContextProvider } from "../contexts/form-context/form-context-provider";

export const FormPage = () => {
    return (
        <FormContextProvider>
            <FormContainer />
        </FormContextProvider>
    );
};
