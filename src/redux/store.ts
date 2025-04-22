import { configureStore } from "@reduxjs/toolkit";
import { formsSlice } from "./entities/form/form-slice";
import { answersSlice } from "./entities/answers/answers-slice";
import { homePageSlice } from "./entities/home-page/home-page-slice";

export const store = configureStore({
    reducer: {
        [formsSlice.name]: formsSlice.reducer,
        [answersSlice.name]: answersSlice.reducer,
        [homePageSlice.name]: homePageSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
