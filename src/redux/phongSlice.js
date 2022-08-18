import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import { phongService } from '../services/phongService';
import { DanhSachPhong, ThongTinPhong } from '../_core/ThongTinPhong';

let initialState = {
    danhSachPhong: DanhSachPhong,
    thongTinChiTietPhong: ThongTinPhong,
    isBookedSuccess: false,
    isExist: true,
};

//Lấy danh sách tất cả phòng tại mọi tỉnh thành
export let getDanhSachPhong = createAsyncThunk(
    'phongSlice/fetchDanhSachPhong',
    async (idViTri) => {
        try {
            let result = await phongService.layDanhSachPhong(idViTri);
            return result.data;
        } catch (error) {
            message.error('Có lỗi xảy ra vui lòng thử lại');
            return error;
        }
    }
);
export const getRoomDetail = createAsyncThunk(
    'phongSlice/getRoomDetail',
    async (id, thunkAPI) => {
        try {
            const res = await phongService.layThongTinChiTietPhong(id);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue();
        }
    }
);

const phongSlice = createSlice({
    name: 'phongSlice',
    initialState: initialState,
    reducers: {
        layDanhSachPhong: (state, action) => {
            state.danhSachPhong = action.payload;
        },
    },
    extraReducers: {
        //Action xử lý lấy danh sách phòng theo id vị trí
        [getDanhSachPhong.pending]: (state, action) => {
            state.danhSachPhong = DanhSachPhong;
        },
        [getDanhSachPhong.fulfilled]: (state, action) => {
            state.danhSachPhong = action.payload;
        },
        [getDanhSachPhong.rejected]: (state, action) => {},
        [getRoomDetail.pending]: (state, action) => {
            state.isExist = true;
            state.thongTinChiTietPhong = {};
        },
        [getRoomDetail.fulfilled]: (state, action) => {
            state.thongTinChiTietPhong = action.payload;
            state.isExist = true;
        },
        [getRoomDetail.rejected]: (state, action) => {
            state.isExist = false;
        },
    },
});

export const { layDanhSachPhong } = phongSlice.actions;

export const selectDanhSachPhong = (state) => state.phongSlice.danhSachPhong;
export const selectThongTinChiTiePhong = (state) =>
    state.phongSlice.thongTinChiTiePhong;

export default phongSlice.reducer;
