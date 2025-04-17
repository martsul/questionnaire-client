import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnswersInitialState } from "../../../types/form/answers-initial-state";
import { getForm } from "../forms/get-forms";

const initialState: AnswersInitialState = {
    requestStatus: "idle",
    answers: {},
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
            if (+payload.value || payload.value == "0") {
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(getForm.pending, (state) => {
                state.requestStatus = "pending";
            })
            .addCase(getForm.rejected, (state) => {
                state.requestStatus = "rejected";
            })
            .addCase(getForm.fulfilled, (state, action) => {
                state.requestStatus = "fulfilled";
                action.payload.questions.forEach((q) => {
                    state.answers[q.id] = "";
                });
            });
    },
});

export const { setCheckboxAnswer, setNumAnswer, setTextAnswer } = answersSlice.actions;
export const { selectAnswers } = answersSlice.selectors;
