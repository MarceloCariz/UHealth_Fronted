import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./slices/ui";
import { categorySlice } from "./slices/category";
import { productSlice } from "./slices/Product";
import { routineSlice } from "./slices/routine";
import { authSlice } from "./slices/auth";
import { userSlice } from "./slices/user";


export const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        category: categorySlice.reducer,
        products: productSlice.reducer,
        routine: routineSlice.reducer,
        users: userSlice.reducer,
    }
})


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;