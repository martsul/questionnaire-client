import { RequestStatus } from "../request-status";
import { Answers } from "./answer";

export type AnswersInitialState = {
    answers: Answers;
    requestStatus: RequestStatus;
    user: { name: string; id: number };
    createdAt: string;
};
