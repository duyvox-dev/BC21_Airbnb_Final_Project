import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { message } from "antd";
import _ from "lodash";
import { localSearchStorageService } from "../services/localService";
import { phongService } from "../services/phongService";
import {
  arrConvenient,
  bath,
  bedRoom,
  DECLINE,
  guests,
  handleDataReduce,
  handleDataSaveArrButton,
  handleDataSaveArrCheckbox,
  handleErrorValueInput,
  INCREASE,
} from "../utils/danhSachPhong.util";

let initialState = {
  danhSachPhong: [],
  dataSave: [],
  averagePrice: 0,
  priceMax: 0,
  priceMin: 0,
  percent: 0,
  valueInputPriceMin: 0,
  errorValueInput: "",
  dataGuests: [],
  dataBedRoom: [],
  dataBath: [],
  valueCheckbox: [],
  dataCheckbox: [],
  dataValueButton: [
    { name: guests, value: 0 },
    { name: bedRoom, value: 0 },
    { name: bath, value: 0 },
  ],
  valueButton: [],
  idCurrent: null,
};

export const getDanhSachPhong = createAsyncThunk(
  "danhSachPhongSlice/fetchGetDataPhong",
  async (idViTri, thunkAPI) => {
    try {
      let result = await phongService.layDanhSachPhongTuViTri(idViTri);
      let dataUpdate = null;
      if (
        thunkAPI.getState().bookingRoomSlice.bookingLocation.idLocation ===
        thunkAPI.getState().danhSachPhongSlice.idCurrent
      ) {
        dataUpdate = result.data.filter(
          (item) =>
            item.guests >= thunkAPI.getState().bookingRoomSlice.totalCustomer
        );
      } else {
        dataUpdate = result.data;
      }
      return dataUpdate;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

const danhSachPhongSlice = createSlice({
  name: "danhSachPhongSlice",
  initialState,
  reducers: {
    getIdCurrent: (state, { payload }) => {
      state.idCurrent = payload;
    },
    // reducer trong khoảng giá
    handleChangePercent: (state, { payload }) => {
      let valueInputUpdate = 0;
      let priceLimit = state.priceMax - state.priceMin;

      if (payload === INCREASE) {
        if (state.percent >= 100) {
          state.percent = 100;
          state.valueInputPriceMin = state.priceMax;
          valueInputUpdate = 0;
        } else {
          state.percent += payload;
          valueInputUpdate = priceLimit / INCREASE;
          state.valueInputPriceMin =
            state.valueInputPriceMin + valueInputUpdate;
        }
      } else if (payload === DECLINE) {
        if (state.percent <= 0) {
          state.percent = 0;
          state.valueInputPriceMin = state.priceMin;
          valueInputUpdate = 0;
        } else {
          state.percent += payload;
          valueInputUpdate = priceLimit / INCREASE;
          state.valueInputPriceMin =
            state.valueInputPriceMin - valueInputUpdate;
        }
      }
      state.errorValueInput = handleErrorValueInput(
        state.valueInputPriceMin,
        state.priceMax,
        state.priceMin
      );
    },
    handleChangeValueInput: (state, { payload }) => {
      let percentUpdate = 0;

      state.valueInputPriceMin = payload;
      percentUpdate = (state.valueInputPriceMin / state.priceMax) * 100;
      state.percent = percentUpdate;
      state.errorValueInput = handleErrorValueInput(
        state.valueInputPriceMin,
        state.priceMax,
        state.priceMin
      );
    },

    // Tiện nghi
    handleCheckbox: (state, { payload }) => {
      let index = state.valueCheckbox.findIndex((item) => item === payload);
      if (index !== -1) {
        state.valueCheckbox.splice(index, 1);
      } else {
        state.valueCheckbox.push(payload);
      }

      let dataCheck = state.valueCheckbox
        ?.map((item) => {
          let arrUpdate = arrConvenient.filter((check) => check.id === item);
          return arrUpdate;
        })
        .flat();
      let keyObj = dataCheck.map((item) => {
        let keys = Object.keys(item).pop();
        return keys;
      });
      state.dataCheckbox = keyObj;
    },

    // Khách, phòng và phòng ngủ
    handleValueButton: (state, { payload }) => {
      switch (payload.name) {
        case guests:
          state.dataValueButton[0] = payload;
          state.valueButton[0] = payload.value;
          break;
        case bedRoom:
          state.dataValueButton[1] = payload;
          state.valueButton[1] = payload.value;
          break;
        case bath:
          state.dataValueButton[2] = payload;
          state.valueButton[2] = payload.value;
          break;
        default:
          break;
      }
    },
    handleSearchRoomList: (state) => {
      let arrData1 = [];
      let arrData2 = [];
      let arrData3 = [];

      // Giá trị được lưu lại khi lọc theo giá
      arrData1 = state.dataSave.filter(
        (item) => item.price >= state.valueInputPriceMin
      );

      if (
        state.valueInputPriceMin < state.priceMin ||
        state.valueInputPriceMin > state.priceMax
      ) {
        message.error(
          `Số tiền không được thấp hơn ${state.priceMin} hoặc lớn hơn ${state.priceMax}`
        );
      } else if (
        state.dataCheckbox.length > 0 &&
        state.valueButton.length > 0
      ) {
        // Nếu button và checkbox đều có thì chạy trường hợp này
        arrData2 = handleDataSaveArrButton(arrData1, state.dataValueButton);
        arrData3 = handleDataSaveArrCheckbox(arrData2, state.dataCheckbox);
      } else if (state.dataCheckbox.length > 0) {
        // Nếu chỉ checkbox có thì chạy trường hợp này
        arrData3 = handleDataSaveArrCheckbox(arrData1, state.dataCheckbox);
      } else if (state.valueButton.length > 0) {
        // Nếu chỉ button có thì chạy trường hợp này
        arrData3 = handleDataSaveArrButton(arrData1, state.dataValueButton);
      } else {
        arrData3 = arrData1;
      }
      state.danhSachPhong = arrData3;
    },
    deleteAllSearchRoomList: (state) => {
      state.valueInputPriceMin = state.priceMin;
      state.valueCheckbox = [];
      state.dataCheckbox = [];
      state.dataValueButton = state.dataValueButton.map((item) => {
        item.value = 0;
        return item;
      });
      state.percent = 0;
      state.danhSachPhong = state.dataSave;
    },
  },
  extraReducers: {
    [getDanhSachPhong.fulfilled]: (state, { payload }) => {
      state.danhSachPhong = payload;
      state.dataSave = payload;
      // khoảng giá
      state.averagePrice = payload?.reduce((average, data) => {
        return (average += data.price);
      }, 0);

      let arrPrice = state.danhSachPhong?.reduce((arr, data) => {
        return [...arr, data.price];
      }, []);
      state.priceMax = Math.max(...arrPrice);
      state.priceMin = Math.min(...arrPrice);
      state.valueInputPriceMin = state.priceMin;

      // Tạo vòng lặp để tạo tất cả mảng rỗng

      // Khách và phòng ngủ
      state.dataGuests = handleDataReduce(payload, guests);
      state.dataBedRoom = handleDataReduce(payload, bedRoom);
      state.dataBath = handleDataReduce(payload, bath);
    },
    [getDanhSachPhong.pending]: (state) => {
      state.danhSachPhong = [];
    },
  },
});

// actions trong khoảng giá
export const handleChangePercent = createAction(
  "danhSachPhongSlice/handleChangePercent",
  (value) => {
    return { payload: value };
  }
);

export const handleChangeValueInput = createAction(
  "danhSachPhongSlice/handleChangeValueInput",
  (value) => {
    let valueUpdate = Number(value);
    return { payload: valueUpdate };
  }
);

// actions tiện nghi
export const handleCheckbox = createAction(
  "danhSachPhongSlice/handleCheckbox",
  (value) => {
    let valueUpdate = Number(value);
    return { payload: valueUpdate };
  }
);

// actions khách, phòng và phòng tắm
export const handleValueButton = createAction(
  "danhSachPhongSlice/handleValueButton",
  (value, name) => {
    let valueUpdate = Number(value);
    let key = { name, value: valueUpdate };
    return { payload: key };
  }
);

export const { handleSearchRoomList, deleteAllSearchRoomList, getIdCurrent } =
  danhSachPhongSlice.actions;

export default danhSachPhongSlice.reducer;
