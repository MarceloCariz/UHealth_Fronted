import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./slices/ui";
import { categorySlice } from "./slices/category";


export const store = configureStore({
    reducer:{
        ui: uiSlice.reducer,
        category: categorySlice.reducer,
    }
})


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;