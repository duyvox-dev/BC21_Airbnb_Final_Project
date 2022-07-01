import { configureStore } from "@reduxjs/toolkit";
import phongSlice from "./phongSlice";
import viTriSlice from "./viTriSlice";

export const store = configureStore({
    reducer: {
        viTriSlice: viTriSlice,
        phongSlice: phongSlice,
    },
});
