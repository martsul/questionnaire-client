import { AvailableUser } from "./available-users";
import { FormHead } from "./form-head";

export type FormEntities = {
    head: FormHead;
    tags: string[];
    users: AvailableUser[];
};
