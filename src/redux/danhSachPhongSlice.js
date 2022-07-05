import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { phongService } from "../services/phongService";
import {
  arrConvenient,
  DECLINE,
  handleDataReduce,
  handleErrorValueInput,
  INCREASE,
  loopReset,
  renderCheckbox,
  switchCaseKeyObj,
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
  id: [],
};

export const getDanhSachPhong = createAsyncThunk(
  "danhSachPhongSlice/fetchGetDataPhong",
  async (idViTri, thunkAPI) => {
    try {
      let result = await phongService.layDanhSachPhongTuViTri(idViTri);
      return result.data;
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

      let arr = switchCaseKeyObj(keyObj, state.danhSachPhong);

      // xét từng trường hợp, nếu không xét như vậy mà dùng cách rút gọn sẽ gây ra lỗi
      switch (keyObj.length) {
        case 0:
          state.id[0] = null;
          state.dataCheckbox[0] = [];
          state.danhSachPhong = state.dataSave;
          break;
        case 1:
          arr = switchCaseKeyObj(keyObj, state.dataSave);
          state.id[0] = state.valueCheckbox[0];
          state.dataCheckbox[0] = arr;
          state.danhSachPhong = state.dataCheckbox[0];
          loopReset(1, state.dataCheckbox, state.id);
          break;
        case 2:
          arr = switchCaseKeyObj(keyObj, state.dataCheckbox[0]);
          state.dataCheckbox[1] = arr;
          state.id[1] = state.valueCheckbox[1];
          state.danhSachPhong = state.dataCheckbox[1];
          loopReset(2, state.dataCheckbox, state.id);
          break;
        case 3:
          arr = switchCaseKeyObj(keyObj, state.dataCheckbox[1]);
          state.dataCheckbox[2] = arr;
          state.id[2] = state.valueCheckbox[2];
          state.danhSachPhong = state.dataCheckbox[2];
          loopReset(3, state.dataCheckbox, state.id);
          break;
        case 4:
          arr = switchCaseKeyObj(keyObj, state.dataCheckbox[2]);
          state.dataCheckbox[3] = arr;
          state.id[3] = state.valueCheckbox[3];
          state.danhSachPhong = state.dataCheckbox[3];
          loopReset(4, state.dataCheckbox, state.id);
          break;
        case 5:
          arr = switchCaseKeyObj(keyObj, state.dataCheckbox[3]);
          state.dataCheckbox[4] = arr;
          state.id[4] = state.valueCheckbox[4];
          state.danhSachPhong = state.dataCheckbox[4];
          loopReset(5, state.dataCheckbox, state.id);
          break;
        case 6:
          arr = switchCaseKeyObj(keyObj, state.dataCheckbox[4]);
          state.dataCheckbox[5] = arr;
          state.id[5] = state.valueCheckbox[5];
          state.danhSachPhong = state.dataCheckbox[5];
          loopReset(6, state.dataCheckbox, state.id);
          break;
        case 7:
          arr = switchCaseKeyObj(keyObj, state.dataCheckbox[5]);
          state.dataCheckbox[6] = arr;
          state.id[6] = state.valueCheckbox[6];
          state.danhSachPhong = state.dataCheckbox[6];
          loopReset(7, state.dataCheckbox, state.id);
          break;
        case 8:
          arr = switchCaseKeyObj(keyObj, state.dataCheckbox[6]);
          state.dataCheckbox[7] = arr;
          state.id[7] = state.valueCheckbox[7];
          state.danhSachPhong = state.dataCheckbox[7];
          loopReset(8, state.dataCheckbox, state.id);
          break;
        default:
          break;
      }
      // if (keyObj.length === 1) {
      //   arr = switchCaseKeyObj(keyObj, state.dataSave);
      //   state.id[0] = state.valueCheckbox[0];
      //   state.dataCheckbox[0] = arr;
      //   state.danhSachPhong = state.dataCheckbox[0];
      //   loopReset(1, state.dataCheckbox, state.id);
      // } else if (keyObj.length === 2) {
      //   arr = switchCaseKeyObj(keyObj, state.dataCheckbox[0]);
      //   state.id[1] = state.valueCheckbox[1];
      //   state.dataCheckbox[1] = arr;
      //   state.danhSachPhong = state.dataCheckbox[1];

      //   loopReset(2, state.dataCheckbox, state.id);
      // } else if (keyObj.length === 3) {
      //   arr = switchCaseKeyObj(keyObj, state.dataCheckbox[1]);
      //   state.id[2] = state.valueCheckbox[2];
      //   state.dataCheckbox[2] = arr;
      //   state.danhSachPhong = state.dataCheckbox[2];

      //   loopReset(3, state.dataCheckbox, state.id);
      // } else if (keyObj.length === 0) {
      //   state.danhSachPhong = state.dataSave;
      //   state.dataCheckbox[0] = [];
      //   state.id[0] = null;
      // } else {
      //   console.log("order");
      // }
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

      let arrPrice = payload?.reduce((arr, data) => {
        return [...arr, data.price];
      }, []);
      state.priceMax = Math.max(...arrPrice);
      state.priceMin = Math.min(...arrPrice);
      state.valueInputPriceMin = state.priceMin;

      // Khách và phòng ngủ
      state.dataGuests = handleDataReduce(payload, "guests");
      state.dataBedRoom = handleDataReduce(payload, "bedRoom");
      state.dataBath = handleDataReduce(payload, "bath");
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

export const handleCheckbox = createAction(
  "danhSachPhongSlice/handleCheckbox",
  (value) => {
    let valueUpdate = Number(value);
    return { payload: valueUpdate };
  }
);

export default danhSachPhongSlice.reducer;
