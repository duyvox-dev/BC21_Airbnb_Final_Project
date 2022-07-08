import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { phongService } from "../services/phongService";

export const bookRoom = createAsyncThunk(
    "booking/bookRoom",
    async (data, thunkAPI) => {
        try {
            const res = await phongService.datPhong(data);
            console.log(res);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue();
        }
    }
);
const bookingRoom = createSlice({
    name: "bookingRoom",
    initialState: {
        bookingLocation: "",
        bookingDate: {
            checkIn: "",
            checkOut: "",
        },
        customerInfo: [],
        isBookedSuccess: false,
    },
    reducers: {
        setBookingDate(state, action) {
            state.bookingDate = action.payload;
        },
        setBookingLocation(state, action) {
            state.bookingLocation = action.payload;
        },
        setCustomerInfo(state, action) {
            state.customerInfo = action.payload;
        },
        setBookingStatus(state, action) {
            state.isBookedSuccess = action.payload;
        },
    },
    extraReducers: {
        [bookRoom.pending]: (state, action) => {
            state.isBookedSuccess = false;
        },
        [bookRoom.fulfilled]: (state, action) => {
            state.isBookedSuccess = true;
        },
    },
});
const { reducer, actions } = bookingRoom;
export const { setBookingDate, setCustomerInfo, setBookingStatus } = actions;
export default reducer;
