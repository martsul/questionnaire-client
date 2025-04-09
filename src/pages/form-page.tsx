import { Form } from "../components/form/form";
import { FormContextProvider } from "../contexts/form-context/form-context-provider";

export const FormPage = () => {
    return (
        <FormContextProvider>
            <Form />
        </FormContextProvider>
    );
};
