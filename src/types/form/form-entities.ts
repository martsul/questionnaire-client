import { AvailableUser } from "./available-users";
import { FormHead } from "./form-head";
import { Question } from "./question";

export type FormEntities = {
    head: FormHead;
    tags: string[];
    users: AvailableUser[];
    questions: Question[]
};
