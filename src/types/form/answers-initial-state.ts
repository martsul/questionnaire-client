import { RequestStatus } from "../request-status"
import { Answers } from "./answer"

export type AnswersInitialState = {
    answers: Answers
    requestStatus: RequestStatus
}