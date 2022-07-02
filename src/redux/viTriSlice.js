import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { viTriService } from "../services/viTriService";
import { DanhSachViTri, ThongTinViTri } from "../_core/ThongTinViTri";

let initialState = {
    danhSachViTri: DanhSachViTri,
    danhSachViTriDanhGiaCao: DanhSachViTri,
    thongTinChiTietViTri: ThongTinViTri,
};

//Lấy danh sách vị trí có điểm đánh giá cao
export let setDanhSachDiaDiemThuHutService = createAsyncThunk(
    "viTriSlice/fetchDanhSachViTriDanhGiaCao",
    async (diemDanhGia, thunkAPI) => {
        try {
            let result = await viTriService.layDanhSachViTriTheoDanhGia(diemDanhGia);
            thunkAPI.dispatch(layDanhSachViTriDanhGiaCao(result.data));
            return result.data;
        } catch (error) {
            console.log(error);

            return error;
        }
    }
);

//Lấy danh sách tất cả các vị trí
export let setDanhSachViTri = createAsyncThunk(
    "viTriSlice/fetchDanhSachViTri",
    async (id, thunkAPI) => {
        try {
            let result = await viTriService.layDanhSachViTri();
            thunkAPI.dispatch(layDanhSachViTri(result.data));
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
});

export const { layDanhSachViTri, layDanhSachViTriDanhGiaCao } = viTriSlice.actions;

export default viTriSlice.reducer;