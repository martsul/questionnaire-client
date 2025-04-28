import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnswersInitialState } from "../../../types/form/answers-initial-state";
import { getForm } from "../form/get-form";
import { getAnswers } from "./get-answers";

const initialState: AnswersInitialState = {
    requestStatus: "idle",
    answers: {},
    user: { name: "", id: NaN },
    createdAt: "",
};

export const answersSlice = createSlice({
    name: "answers",
    initialState,
    reducers: {
        setTextAnswer: (
            state,
            { payload }: PayloadAction<{ value: string; id: string }>
        ) => {
            state.answers[payload.id] = payload.value;
        },
        setNumAnswer: (
            state,
            { payload }: PayloadAction<{ value: string; id: string }>
        ) => {
            if (
                +payload.value ||
                payload.value === "0" ||
                payload.value === ""
            ) {
                state.answers[payload.id] = payload.value;
            }
        },
        setCheckboxAnswer: (
            state,
            {
                payload,
            }: PayloadAction<{ value: string; id: string; isAdd: boolean }>
        ) => {
            if (!Array.isArray(state.answers[payload.id])) {
                state.answers[payload.id] = [];
            }
            const answers = state.answers[payload.id] as string[];
            if (payload.isAdd) {
                answers.push(payload.value);
            } else {
                const valueIndex = answers.indexOf(payload.value);
                answers.splice(valueIndex, 1);
            }
        },
    },
    selectors: {
        selectAnswers: (state) => {
            return state.answers;
        },
        selectRequestStatus: (state) => {
            return state.requestStatus;
        },
        selectCheckedAnswers: (state, payload: string) => {
            return state.answers[payload];
        },
        selectUser: (state) => {
            return state.user;
        },
        selectCreatedAt: (state) => {
            return state.createdAt;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getForm.pending, (state) => {
                state.requestStatus = "pending";
            })
            .addCase(getForm.rejected, (state) => {
                console.error("Get Form Error");
                state.requestStatus = "rejected";
            })
            .addCase(getForm.fulfilled, (state, action) => {
                state.requestStatus = "fulfilled";
                action.payload.questions.forEach((q) => {
                    state.answers[q.id] = "";
                });
            })
            .addCase(getAnswers.pending, (state) => {
                state.answers = {};
                state.requestStatus = "pending";
            })
            .addCase(getAnswers.rejected, (state) => {
                console.error("Get Answers Error");
                state.requestStatus = "rejected";
            })
            .addCase(getAnswers.fulfilled, (state, action) => {
                state.requestStatus = "fulfilled";
                state.createdAt = action.payload.createdAt;
                state.user = action.payload.user;
                action.payload.answers.forEach((a) => {
                    const answer = state.answers[a.questionId];
                    if (answer) {
                        if (Array.isArray(answer)) {
                            answer.push(a.answer);
                        } else {
                            state.answers[a.questionId] = [answer, a.answer];
                        }
                    } else {
                        state.answers[a.questionId] = a.answer;
                    }
                });
            });
    },
});

export const { setCheckboxAnswer, setNumAnswer, setTextAnswer } =
    answersSlice.actions;
export const {
    selectAnswers,
    selectRequestStatus,
    selectCheckedAnswers,
    selectUser,
    selectCreatedAt,
} = answersSlice.selectors;
