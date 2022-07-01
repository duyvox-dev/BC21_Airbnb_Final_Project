import { createSlice } from "@reduxjs/toolkit";
import { DanhSachPhong, ThongTinPhong } from "../_core/ThongTinPhong";
import { ThongTinViTri } from "../_core/ThongTinViTri";

let initialState = {
    danhSachPhong: DanhSachPhong,
    thongTinChiTiePhong: ThongTinPhong,
};

const phongSlice = createSlice({
    name: "phongSlice",
    initialState: initialState,
    reducers: {
        layDanhSachPhong: (state, action) => {
            state.danhSachPhong = action.payload;
        },
    },
});

export const { layDanhSachPhong } = phongSlice.actions;

export default phongSlice.reducer;