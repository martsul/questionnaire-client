import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { formsSliceState } from "../../../types/form/form-slice-state";
import { getForm } from "./get-forms";
import { FormHead } from "../../../types/form/form-head";
import { v4 as uuidv4 } from "uuid";
import {
    ChangeAnswerPayload,
    ChangeTextAnswerPayload,
    ChangeTypePayload,
    DeleteAnswerPayload,
    SetQuestionsPayload,
    ToggleStatisticPayload,
} from "../../../types/payloads/form-payloads";

const initialState: formsSliceState = {
    head: null,
    tags: [],
    users: [],
    questions: [],
    requestStatus: "idle",
};

export const formsSlice = createSlice({
    name: "forms",
    initialState,
    reducers: {
        changeHeadTitle: (state, { payload }: PayloadAction<string>) => {
            if (state.head) {
                state.head.title = payload;
            }
        },
        changeHeadDescription: (state, { payload }: PayloadAction<string>) => {
            if (state.head && payload.length <= 512) {
                state.head.description = payload;
            }
        },
        togglePublic: (state) => {
            if (state.head) {
                state.head.isPublic = !state.head.isPublic;
            }
        },
        addAnswer: (state, { payload }: PayloadAction<number>) => {
            const answers = state.questions[payload].answers;
            if (answers) {
                answers.push("");
            } else {
                state.questions[payload].answers = [""];
            }
        },
        setTheme: (state, { payload }: PayloadAction<string>) => {
            if (state.head) {
                state.head.theme = payload;
            }
        },
        deleteAnswer: (
            state,
            { payload }: PayloadAction<DeleteAnswerPayload>
        ) => {
            const answers = state.questions[payload.index].answers;
            const deleted = new Set(payload.deleteAnswer);
            if (answers) {
                state.questions[payload.index].answers = answers.filter(
                    (_, i) => !deleted.has(i)
                );
            }
        },
        changeType: (state, { payload }: PayloadAction<ChangeTypePayload>) => {
            state.questions[payload.index].type = payload.type;
            if (payload.type === "checkbox") {
                state.questions[payload.index].answers = [""];
            } else {
                state.questions[payload.index].answers = undefined;
            }
        },
        setQuestions: (
            state,
            { payload }: PayloadAction<SetQuestionsPayload>
        ) => {
            state.questions = payload.map((q, index) => ({ ...q, index }));
        },
        addQuestion: (state) => {
            const id = uuidv4();
            state.questions.push({
                id,
                type: "line",
                title: "",
                description: "",
                index: state.questions.length,
                inStatistic: true,
            });
        },
        addTag: (state, { payload }: PayloadAction<string>) => {
            const uniqueTags = new Set(state.tags);
            uniqueTags.add(payload);
            state.tags = Array.from(uniqueTags);
        },
        deleteTag: (state, { payload }: PayloadAction<string>) => {
            const uniqueTags = new Set(state.tags);
            uniqueTags.delete(payload);
            state.tags = Array.from(uniqueTags);
        },
        addUser: (state, { payload }) => {
            if (state.users) {
                state.users[payload.id] = payload;
            }
        },
        deleteUser: (state, { payload }) => {
            if (state.users) {
                delete state.users[payload.id];
            }
        },
        changeQuestionTitle: (
            state,
            { payload }: PayloadAction<ChangeTextAnswerPayload>
        ) => {
            state.questions[payload.index].title = payload.value;
        },
        changeQuestionDescription: (
            state,
            { payload }: PayloadAction<ChangeTextAnswerPayload>
        ) => {
            state.questions[payload.index].description = payload.value;
        },
        changeAnswer: (
            state,
            { payload }: PayloadAction<ChangeAnswerPayload>
        ) => {
            const answers = state.questions[payload.questionIndex].answers;
            if (answers) {
                answers[payload.answerIndex] = payload.value;
            }
        },
        setImg: (state, { payload }: PayloadAction<string>) => {
            if (state.head) {
                state.head.img = payload;
            }
        },
        toggleLike: (state) => {
            if (state.head) {
                if (state.head.isLiked) {
                    state.head.likes--;
                } else {
                    state.head.likes++;
                }
                state.head.isLiked = !state.head.isLiked;
            }
        },
        toggleStatistic: (
            state,
            { payload }: PayloadAction<ToggleStatisticPayload>
        ) => {
            const questions = new Set(payload.questions);
            state.questions.forEach((q) => {
                if (questions.has(q.id)) {
                    q.inStatistic = payload.inStatistic;
                }
            });
        },
    },
    selectors: {
        selectQuestions: (state) => {
            return state.questions;
        },
        selectHead: (state) => {
            return state.head;
        },
        selectFormStatus: (state) => {
            return state.requestStatus;
        },
        selectTags: (state) => {
            return state.tags;
        },
        selectUsers: (state) => {
            return state.users;
        },
        selectEditData: (state) => {
            if (state.head) {
                return {
                    formId: state.head.id,
                    title: state.head.title,
                    theme: state.head.theme,
                    description: state.head.description,
                    isPublic: state.head.isPublic,
                    users: state.users,
                    tags: state.tags,
                    questions: state.questions,
                    img: state.head.img,
                };
            }
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
                state.head = action.payload.head as FormHead;
                state.tags = action.payload.tags;
                state.questions = action.payload.questions;
                action.payload.users.forEach((u) => {
                    if (!state.users) {
                        state.users = {};
                    }
                    state.users[u.id] = u;
                });
            });
    },
});

export const {
    selectHead,
    selectFormStatus,
    selectTags,
    selectUsers,
    selectQuestions,
    selectEditData,
} = formsSlice.selectors;
export const {
    changeHeadTitle,
    changeHeadDescription,
    togglePublic,
    addTag,
    addUser,
    deleteTag,
    deleteUser,
    addQuestion,
    setQuestions,
    changeType,
    addAnswer,
    deleteAnswer,
    setTheme,
    changeQuestionTitle,
    changeQuestionDescription,
    changeAnswer,
    setImg,
    toggleLike,
    toggleStatistic,
} = formsSlice.actions;
