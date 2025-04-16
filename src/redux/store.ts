import { configureStore } from "@reduxjs/toolkit";
import { formsSlice } from "./entities/forms/forms-slice";

export const store = configureStore({
    reducer: {
        [formsSlice.name]: formsSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
