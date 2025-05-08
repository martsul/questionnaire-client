import { Button, Form } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { useSalesforceForm } from "./use-salesforce-form";
import { SalesforceInputs } from "../salesforce-inputs/salesforce-inputs";

export const SalesforceForm = () => {
    const { isRegistered, onClick, fields, onChange } = useSalesforceForm();
    const { language } = useLanguage();
    const { salesforce } = dictionary[language];

    return (
        <Form className="d-flex flex-column gap-5">
            <h1>Salesforce</h1>
            <SalesforceInputs onChange={onChange} fields={fields} isRegistered={isRegistered} />
            <Button type="button" onClick={onClick}>
                {isRegistered ? salesforce.update : salesforce.register}
            </Button>
        </Form>
    );
};
