import { QuestionsType } from "./questions-type";

export type Question = {
    type: QuestionsType;
    id: string;
    index: number;
    title: string;
    description: string;
    inStatistic: boolean;
    answers?: string[];
};

