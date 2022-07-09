import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
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
export const setCustomerInfo = createAction(
    "bookingRoom/setCustomerInfo",
    (customerInfo) => {
        const countTotalCustomer = () => {
            return customerInfo.reduce((sum, customer) => {
                return sum + customer.soLuong;
            }, 0);
        };
        const totalCus = countTotalCustomer();
        return {
            payload: {
                customerInfo,
                totalCustomer: totalCus,
            },
        };
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
        totalCustomer: 0,
    },
    reducers: {
        setBookingDate(state, action) {
            state.bookingDate = action.payload;
        },
        setBookingLocation(state, action) {
            state.bookingLocation = action.payload;
        },
        setCustomerInfo(state, action) {
            state.customerInfo = action.payload.customerInfo;
            state.totalCustomer = action.payload.totalCustomer;
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
export const { setBookingDate, setBookingStatus } = actions;
export default reducer;
