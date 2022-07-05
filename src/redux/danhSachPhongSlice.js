import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { phongService } from "../services/phongService";
import {
  arrConvenient,
  DECLINE,
  handleDataReduce,
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
        let values = Object.values(item).pop();
        return { [keys]: values };
      });
      // let dataDanhSachPhongUpdate = keyObj.map((item) => {
      //   let arrUpdate = state.danhSachPhong.filter(
      //     (itemArr) => itemArr[item] === true
      //   );
      //   return arrUpdate;
      // });
      let arrNew = state.dataSave.map((item) => {
        let arr = [];
        let check = keyObj.filter((itemCheck) => {
          for (const [key, value] of Object.entries(itemCheck)) {
            if (item[key] === itemCheck[key]) {
              return [...arr, item];
            } else {
              return 0;
            }
          }
        });
        return arr;
      });
      console.log(arrNew);
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
