import { QuestionsType } from "../form/questions-type";
import { Question } from "../../types/form/question";

export type DeleteAnswerPayload = {
    deleteAnswer: number[];
    index: number;
};
export type ChangeTypePayload = {
    type: QuestionsType;
    index: number;
};
export type SetQuestionsPayload = Question[];
export type ChangeTextAnswerPayload = {
    index: number;
    value: string;
};
export type ChangeAnswerPayload = {
    questionIndex: number;
    answerIndex: number;
    value: string;
};
