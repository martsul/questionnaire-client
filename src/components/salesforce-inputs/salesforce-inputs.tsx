import { FC } from "react";
import { Form } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { SfUser } from "../../types/sf-user";

type Props = {
    isRegistered: boolean;
    fields: SfUser;
    onChange: (field: keyof SfUser, value: string) => void;
};

export const SalesforceInputs: FC<Props> = ({
    isRegistered,
    fields,
    onChange,
}) => {
    const { language } = useLanguage();
    const { salesforce } = dictionary[language];

    return (
        <div className="d-flex flex-column gap-4">
            <label className="d-flex flex-column gap-2">
                <span>{salesforce.firstName}</span>
                <Form.Control
                    onChange={(event) => {
                        onChange("FirstName", event.target.value);
                    }}
                    value={fields.FirstName || ""}
                    type="text"
                    disabled={!isRegistered}
                />
            </label>
            <label className="d-flex flex-column gap-2">
                <span>{salesforce.lastName}</span>
                <Form.Control
                    onChange={(event) => {
                        onChange("LastName", event.target.value);
                    }}
                    value={fields.LastName}
                    type="text"
                    disabled={!isRegistered}
                />
            </label>
            <label className="d-flex flex-column gap-2">
                <span>{salesforce.phone}</span>
                <Form.Control
                    onChange={(event) => {
                        onChange("Phone", event.target.value);
                    }}
                    value={fields.Phone || ""}
                    type="tel"
                    disabled={!isRegistered}
                />
            </label>
            <label className="d-flex flex-column gap-2">
                <span>{salesforce.email}</span>
                <Form.Control
                    onChange={(event) => {
                        onChange("Email", event.target.value);
                    }}
                    value={fields.Email}
                    type="email"
                    disabled={!isRegistered}
                />
            </label>
            <label className="d-flex flex-column gap-2">
                <span>{salesforce.title}</span>
                <Form.Control
                    onChange={(event) => {
                        onChange("Title", event.target.value);
                    }}
                    value={fields.Title || ""}
                    type="text"
                    disabled={!isRegistered}
                />
            </label>
        </div>
    );
};
