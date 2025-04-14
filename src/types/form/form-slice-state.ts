import { AvailableUser } from "./available-users";
import { FormHead } from "./form-head";
import { Question } from "./question";

export type FormSliceState = {
    head: FormHead | null;
    tags: string[] | null;
    users: Record<number, AvailableUser> | null;
    questions: Question[];
    requestStatus: "idle" | "pending" | "rejected" | "fulfilled";
};
