import { createSlice } from "@reduxjs/toolkit";
import { HomePageInitialState } from "../../../types/home-page-initial-state";
import { getHomePage } from "./get-home-page";

const initialState: HomePageInitialState = {
    lastForms: [],
    popularForms: [],
    popularTags: [],
    requestStatus: "idle",
};

export const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {},
    selectors: {
        selectLastForms: (state) => {
            return state.lastForms;
        },
        selectPopularForms: (state) => {
            return state.popularForms;
        },
        selectPopularTags: (state) => {
            return state.popularTags;
        },
        selectRequestStatus: (state) => {
            return state.requestStatus;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHomePage.pending, (state) => {
                state.requestStatus = "pending";
            })
            .addCase(getHomePage.rejected, (state) => {
                state.requestStatus = "rejected";
            })
            .addCase(getHomePage.fulfilled, (state, { payload }) => {
                state.requestStatus = "fulfilled";
                state.lastForms = payload.lastForms;
                state.popularForms = payload.popularForms;
                state.popularTags = payload.popularTags;
            });
    },
});

export const {
    selectLastForms,
    selectPopularForms,
    selectPopularTags,
    selectRequestStatus,
} = homePageSlice.selectors;
