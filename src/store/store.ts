import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./slices/ui";
import { categorySlice } from "./slices/category";
import { productSlice } from "./slices/Product";
import { routineSlice } from "./slices/routine";


export const store = configureStore({
    reducer:{
        ui: uiSlice.reducer,
        category: categorySlice.reducer,
        products: productSlice.reducer,
        routine: routineSlice.reducer
    }
})


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;