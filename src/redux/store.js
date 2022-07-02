import { configureStore } from "@reduxjs/toolkit";
import danhGiaSlice from "./danhGiaSlice";
import phongSlice from "./phongSlice";
import viTriSlice from "./viTriSlice";

export const store = configureStore({
    reducer: {
        viTriSlice: viTriSlice,
        phongSlice: phongSlice,
        danhGiaSlice: danhGiaSlice,
    },
});
