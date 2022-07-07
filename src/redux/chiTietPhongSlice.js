import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const chiTietPhongSlice = createSlice({
    name: "chiTietPhongSlice",
    initialState: {
        daysOfBooking: 0,
        bookingDate: {},
        isBookedSuccess: false,
        customerInfo: {},
    },
    reducers: {},
    extraReducers: {},
});
const { reducer } = chiTietPhongSlice;
export default reducer;
