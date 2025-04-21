import { Question } from "./question";

export type GetAnswerResponse = {
    user: string;
    createdAt: string;
    answers: { answer: string; questionId: string }[];
    questions: Question[];
};
