import { UsersState } from "../users-state";
import { FormHead } from "./form-head";
import { TagsState } from "./tags-state";

export type FormSliceState = {
    head: FormHead | null;
    tags: TagsState | null;
    users: UsersState | null;
    requestStatus: "idle" | "pending" | "rejected" | "fulfilled";
};
