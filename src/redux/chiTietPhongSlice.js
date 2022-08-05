import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const chiTietPhongSlice = createSlice({
    name: "chiTietPhongSlice",
    initialState: {
        commentModal: false,
        directModal: false,
        bookTicketModal: false,
        authModal: false,
    },
    reducers: {
        setCommentModal: (state, action) => {
            state.commentModal = action.payload;
        },
        setDirectModal: (state, action) => {
            state.directModal = action.payload;
        },
        setBookTicketModal: (state, action) => {
            state.bookTicketModal = action.payload;
        },
        setAuthModal: (state, action) => {
            state.authModal = action.payload;
        },
    },
});
const { reducer, actions } = chiTietPhongSlice;
export const {
    setAuthModal,
    setBookTicketModal,
    setCommentModal,
    setDirectModal,
} = actions;
export default reducer;
