import { configureStore } from "@reduxjs/toolkit";
import { formsSlice } from "./entities/form/form-slice";
import { answersSlice } from "./entities/answers/answers-slice";

export const store = configureStore({
    reducer: {
        [formsSlice.name]: formsSlice.reducer,
        [answersSlice.name]: answersSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
