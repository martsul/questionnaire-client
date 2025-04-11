import { createSlice } from "@reduxjs/toolkit";
import { FormSliceState } from "../../../types/form/form-slice-state";
import { getForm } from "./get-form";
import { FormEntities } from "../../../types/form/form-entities";

const initialState: FormSliceState = {
    formData: null,
    requestStatus: "idle",
};

export const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {},
    selectors: {
        selectFormData: (state) => {
            return state.formData;
        },
        selectFormStatus: (state) => {
            return state.requestStatus;
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
                state.formData = action.payload as FormEntities;
            });
    },
});

export const { selectFormData, selectFormStatus } = formSlice.selectors;
