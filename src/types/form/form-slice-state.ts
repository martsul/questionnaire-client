import { RequestStatus } from "../request-status";
import { AvailableUser } from "./available-users";
import { FormHead } from "./form-head";
import { Question } from "./question";

export type formsSliceState = {
    head: FormHead | null;
    tags: string[];
    users: Record<number, AvailableUser>;
    questions: Question[];
    requestStatus: RequestStatus;
};
