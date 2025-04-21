import { Question } from "./question";

export type EditData = {
    formId: number;
    title: string;
    theme: string;
    description: string;
    isPublic: boolean;
    users: number[];
    tags: string[];
    questions: Question[];
    img: string;
};
