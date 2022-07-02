import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../services/authService";
import { localStorageService } from "../services/localService";

const initialState = {
  userLogin: localStorageService.getUserLocal(),
};

export const postDataDangKy = createAsyncThunk(
  "authSlice/fetchDataDangKy",
  async (dataDangKy) => {
    const result = await authService.dangKy(dataDangKy);
    return result.data.content;
  }
);

export const postDataDangNhap = createAsyncThunk(
  "authSlice/fetchDataDangNhap",
  async (dataDangNhap) => {
    const result = await authService.dangNhap(dataDangNhap);
    return result.data.user;
  }
);

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [postDataDangNhap.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.userLogin = payload;
    },
  },
});

export default authSlice.reducer;
