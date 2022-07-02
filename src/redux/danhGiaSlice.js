import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { danhGiaService } from "../services/danhGiaService";
import { DanhSachDanhGia, ThongTinDanhGia } from "../_core/ThongTinDanhGia";
import { DanhSachPhong, ThongTinPhong } from "../_core/ThongTinPhong";
import { ThongTinViTri } from "../_core/ThongTinViTri";

let initialState = {
    danhSachDanhGia: DanhSachDanhGia,
    thongTinChiDanhGia: ThongTinDanhGia,
};

//Lấy danh sách đánh giá của phòng cụ thể
export let setDanhSachDanhGiaPhongService = createAsyncThunk(
    "danhGiaSlice/fetchDanhSachDanhGiaTheoPhong",
    async (idPhong, thunkAPI) => {
        try {
            let result = await danhGiaService.layDanhSachDanhGiaTheoPhong(idPhong);
            thunkAPI.dispatch(layDanhSachDanhGia(result.data));
            return result.data;
        } catch (error) {
            console.log(error);

            return error;
        }
    }
);

const danhGiaSlice = createSlice({
    name: "danhGiaSlice",
    initialState: initialState,
    reducers: {
        layDanhSachDanhGia: (state, action) => {
            state.danhSachDanhGia = action.payload;
        },
    },
});

export const { layDanhSachDanhGia } = danhGiaSlice.actions;

export default danhGiaSlice.reducer;