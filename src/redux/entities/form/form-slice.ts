import { createSlice } from "@reduxjs/toolkit";
import { FormSliceState } from "../../../types/form/form-slice-state";
import { getForm } from "./get-form";
import { FormHead } from "../../../types/form/form-head";

const initialState: FormSliceState = {
    head: null,
    tags: null,
    users: null,
    requestStatus: "idle",
};

export const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        addTag: (state, { payload }) => {
            state.tags?.addTags.add(payload);
            state.tags?.deleteTags.delete(payload);
        },
        deleteTag: (state, { payload }) => {
            state.tags?.deleteTags.add(payload);
            state.tags?.addTags.delete(payload);
        },
        addUser: (state, { payload }) => {
            if (state.users) {
                state.users.addUsers[payload.id] = payload;
                delete state.users?.deleteUsers[payload.id];
            }
        },
        deleteUser: (state, { payload }) => {
            console.log(payload);
            if (state.users) {
                state.users.deleteUsers[payload.id] = payload;
                delete state.users.addUsers[payload.id];
            }
        },
    },
    selectors: {
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
                state.tags = {
                    addTags: new Set(action.payload.tags),
                    deleteTags: new Set(),
                };
                state.users = {
                    addUsers: {},
                    deleteUsers: {},
                };
                action.payload.users.forEach((u) => {
                    if (state.users) {
                        state.users.addUsers[u.id] = u;
                    }
                });
            });
    },
});

export const { selectHead, selectFormStatus, selectTags, selectUsers } =
    formSlice.selectors;
export const { addTag, addUser, deleteTag, deleteUser } = formSlice.actions;
