import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import danhGiaSlice from "./danhGiaSlice";
import nguoiDungSlice from "./nguoiDungSlice";
import danhSachPhongSlice from "./danhSachPhongSlice";
import phongSlice from "./phongSlice";
import viTriSlice from "./viTriSlice";
import bookingRoomSlice from "./bookingRoomSlice";
import pageSlice from "./pageSlice";
import chiTietPhongSlice from "./chiTietPhongSlice";
import loadingSlice from "./loadingSlice";

export const store = configureStore({
    reducer: {
        viTriSlice: viTriSlice,
        phongSlice: phongSlice,
        danhGiaSlice: danhGiaSlice,
        nguoiDungSlice: nguoiDungSlice,
        pageSlice: pageSlice,
        bookingRoomSlice,
        authSlice,
        danhSachPhongSlice,
        chiTietPhongSlice,
        loadingSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
