import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const chiTietPhongSlice = createSlice({
    name: "chiTietPhongSlice",
    initialState: {
        daysOfBooking: 0,
        location: "",
        bookingDate: {
            checkIn: "",
            checkOut: "",
        },
        customerInfo: {},
        isBookedSuccess: false,
    },
    reducers: {},
    extraReducers: {},
});
const { reducer } = chiTietPhongSlice;
export default reducer;
