import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { phongService } from "../services/phongService";
import { DanhSachPhong, ThongTinPhong } from "../_core/ThongTinPhong";
import { ThongTinViTri } from "../_core/ThongTinViTri";

let initialState = {
    danhSachPhong: DanhSachPhong,
    thongTinChiTiePhong: ThongTinPhong,
};

//Lấy danh sách tất cả phòng tại mọi tỉnh thành
export let setDanhSachPhongService = createAsyncThunk(
    "phongSlice/fetchDanhSachPhong",
    async (idViTri, thunkAPI) => {
        try {
            let result = await phongService.layDanhSachPhong(idViTri);
            thunkAPI.dispatch(layDanhSachPhong(result.data));
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
});

export const { layDanhSachPhong } = phongSlice.actions;

export default phongSlice.reducer;