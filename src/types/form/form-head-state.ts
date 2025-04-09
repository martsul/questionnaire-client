import { StaticFormTheme } from "./static-form-theme";

export type FormHeadState = {
    isPublic: boolean;
    owner: string;
    date: Date;
    title: string;
    description: string;
    theme: StaticFormTheme;
    ownTheme: string;
    tags: Set<string>;
    tag: string
    sortUsers: "email" | "name";
    user: string
    users: Set<string>;
    like: boolean;
    isNew:boolean
};
