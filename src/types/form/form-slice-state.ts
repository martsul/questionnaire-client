import { MultiValue } from "react-select";
import { RequestStatus } from "../request-status";
import { SelectValue } from "../select-value";
import { AvailableUser } from "./available-users";
import { FormHead } from "./form-head";
import { Question } from "./question";

export type formsSliceState = {
    head: FormHead | null;
    tags: MultiValue<SelectValue>;
    users: AvailableUser[];
    questions: Question[];
    requestStatus: RequestStatus;
};
