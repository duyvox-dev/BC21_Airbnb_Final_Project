import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { viTriService } from "../services/viTriService";
import { DanhSachViTri, ThongTinViTri } from "../_core/ThongTinViTri";

let initialState = {
    danhSachViTri: DanhSachViTri,
    danhSachViTriDanhGiaCao: DanhSachViTri,
    thongTinChiTietViTri: ThongTinViTri,
};

//Lấy danh sách vị trí có điểm đánh giá cao
export let danhSachDiaDiemThuHutAsync = createAsyncThunk(
    "viTriSlice/fetchDanhSachViTriDanhGiaCao",
    async (diemDanhGia) => {
        try {
            let result = await viTriService.layDanhSachViTriTheoDanhGia(diemDanhGia);
            return result.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

//Lấy danh sách tất cả các vị trí
export let danhSachViTriAsync = createAsyncThunk(
    "viTriSlice/fetchDanhSachViTri",
    async () => {
        try {
            let result = await viTriService.layDanhSachViTri();
            return result.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

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
    extraReducers: {
        //Action xử lý lấy danh sách địa điểm thu hút nhất
        [danhSachDiaDiemThuHutAsync.pending]: (state, action) => {
            state.danhSachViTriDanhGiaCao = DanhSachViTri;
        },
        [danhSachDiaDiemThuHutAsync.fulfilled]: (state, action) => {
            state.danhSachViTriDanhGiaCao = action.payload;
        },
        [danhSachDiaDiemThuHutAsync.rejected]: (state, action) => { },

        //Action xử lý lấy danh sách tất cả địa điểm
        [danhSachViTriAsync.pending]: (state, action) => {
            state.danhSachViTri = DanhSachViTri;
        },
        [danhSachViTriAsync.fulfilled]: (state, action) => {
            state.danhSachViTri = action.payload;
        },
        [danhSachViTriAsync.rejected]: (state, action) => { },
    },
});

export const { layDanhSachViTri, layDanhSachViTriDanhGiaCao } = viTriSlice.actions;

export const selectDanhSachViTri = (state) => state.viTriSlice.danhSachViTri;
export const selectDanhSachViTriDanhGiaCao = (state) => state.viTriSlice.danhSachViTriDanhGiaCao;
export const selectThongTinChiTietViTri = (state) => state.viTriSlice.thongTinChiTietViTri;

export default viTriSlice.reducer;