import { createSlice } from "@reduxjs/toolkit";
import { DanhSachViTri, ThongTinViTri } from "../_core/ThongTinViTri";

let initialState = {
    danhSachViTri: DanhSachViTri,
    danhSachViTriDanhGiaCao: DanhSachViTri,
    thongTinChiTietViTri: ThongTinViTri,
};

const viTriSlice = createSlice({
    name: "viTriSlice",
    initialState: initialState,
    reducers: {
        layDanhSachViTri: (state, action) => {
            state.danhSachViTri = action.payload;
        },
        layDanhSachViTriDanhGiaCao: (state, action) => {
            state.danhSachViTriDanhGiaCao = action.payload;
        },
    },
});

export const { layDanhSachViTri, layDanhSachViTriDanhGiaCao } = viTriSlice.actions;

export default viTriSlice.reducer;