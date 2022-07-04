import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { phongService } from "../services/phongService";
import { DanhSachPhong, ThongTinPhong } from "../_core/ThongTinPhong";
import { ThongTinViTri } from "../_core/ThongTinViTri";

let initialState = {
    danhSachPhong: DanhSachPhong,
    thongTinChiTiePhong: ThongTinPhong,
};

//Lấy danh sách tất cả phòng tại mọi tỉnh thành
export let danhSachPhongAsync = createAsyncThunk(
    "phongSlice/fetchDanhSachPhong",
    async (idViTri) => {
        try {
            let result = await phongService.layDanhSachPhong(idViTri);
            return result.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

const phongSlice = createSlice({
    name: "phongSlice",
    initialState: initialState,
    reducers: {
        layDanhSachPhong: (state, action) => {
            state.danhSachPhong = action.payload;
        },
    },
    extraReducers: {
        //Action xử lý lấy danh sách phòng theo id vị trí
        [danhSachPhongAsync.pending]: (state, action) => {
            state.danhSachPhong = DanhSachPhong;
        },
        [danhSachPhongAsync.fulfilled]: (state, action) => {
            state.danhSachPhong = action.payload;
        },
        [danhSachPhongAsync.rejected]: (state, action) => { },
    },
});

export const { layDanhSachPhong } = phongSlice.actions;

export const selectDanhSachPhong = (state) => state.phongSlice.danhSachPhong;
export const selectThongTinChiTiePhong = (state) => state.phongSlice.thongTinChiTiePhong;

export default phongSlice.reducer;