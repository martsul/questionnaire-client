import { Question } from "./question";

export type GetAnswerResponse = {
    user: { name: string; id: number };
    createdAt: string;
    answers: { answer: string; questionId: string }[];
    questions: Question[];
};
