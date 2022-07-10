import _ from "lodash";

export const INCREASE = 10;
export const DECLINE = -10;
export const guests = "guests";
export const bedRoom = "bedRoom";
export const bath = "bath";

// khi có lỗi thì sẽ trả về chuỗi lỗi
export let handleErrorValueInput = (valueInput, max, min) => {
  let error = "";
  if (valueInput < min) {
    error = `Giá tối thiểu không thể nhỏ hơn ${min.toLocaleString()}`;
  } else if (valueInput > max) {
    error = `Giá tối thiểu không thể lớn hơn ${max.toLocaleString()}`;
  } else {
    error = "";
  }
  return error;
};

// lọc ra những id phù hợp
export let handleDataReduce = (payload, selected) => {
  return _.sortBy(
    _.unionBy(
      payload?.reduce((arrNew, data) => {
        return [
          ...arrNew,
          selected === guests
            ? data.guests
            : selected === bedRoom
            ? data.bedRoom
            : data.bath,
        ];
      }, [])
    )
  );
};

// mảng tiện nghi được tạo ra để render ui
export let arrConvenient = [
  { id: 1, name: "Cable TV", cableTV: true },
  { id: 2, name: "Thang máy", elevator: true },
  { id: 3, name: "Máy sấy", dryer: true },
  { id: 4, name: "Máy sưởi", indoorFireplace: true },
  { id: 5, name: "Lửa trại", heating: true },
  { id: 6, name: "Bếp", kitchen: true },
  { id: 7, name: "Wifi", wifi: true },
  { id: 8, name: "Hồ bơi", pool: true },
  { id: 9, name: "Gym", gym: true },
  { id: 10, name: "Bồn tắm nước nóng", hotTub: true },
];

// Lưu dữ liệu button ở lọc danh sách phòng
export let handleDataSaveArrButton = (arr, dataValueButton) => {
  return arr.reduce((arrNew, item) => {
    if (
      item[dataValueButton[0].name] >= dataValueButton[0].value &&
      item[dataValueButton[1].name] >= dataValueButton[1].value &&
      item[dataValueButton[2].name] >= dataValueButton[2].value
    ) {
      return [...arrNew, item];
    } else {
      return [...arrNew];
    }
  }, []);
};

// Lưu dữ liệu checkbox ở lọc danh sách phòng
export let handleDataSaveArrCheckbox = (arr, dataCheckbox) => {
  return arr.filter((item) => {
    switch (dataCheckbox.length) {
      case 1:
        if (item[dataCheckbox[0]] === true) {
          return item;
        }
        break;
      case 2:
        if (item[dataCheckbox[0]] === true && item[dataCheckbox[1]] === true) {
          return item;
        }

        break;
      case 3:
        if (
          item[dataCheckbox[0]] === true &&
          item[dataCheckbox[1]] === true &&
          item[dataCheckbox[2]] === true
        ) {
          return item;
        }

        break;
      case 4:
        if (
          item[dataCheckbox[0]] === true &&
          item[dataCheckbox[1]] === true &&
          item[dataCheckbox[2]] === true &&
          item[dataCheckbox[3]] === true
        ) {
          return item;
        }

        break;
      case 5:
        if (
          item[dataCheckbox[0]] === true &&
          item[dataCheckbox[1]] === true &&
          item[dataCheckbox[2]] === true &&
          item[dataCheckbox[3]] === true &&
          item[dataCheckbox[4]] === true
        ) {
          return item;
        }

        break;
      case 6:
        if (
          item[dataCheckbox[0]] === true &&
          item[dataCheckbox[1]] === true &&
          item[dataCheckbox[2]] === true &&
          item[dataCheckbox[3]] === true &&
          item[dataCheckbox[4]] === true &&
          item[dataCheckbox[5]] === true
        ) {
          return item;
        }

        break;
      case 7:
        if (
          item[dataCheckbox[0]] === true &&
          item[dataCheckbox[1]] === true &&
          item[dataCheckbox[2]] === true &&
          item[dataCheckbox[3]] === true &&
          item[dataCheckbox[4]] === true &&
          item[dataCheckbox[5]] === true &&
          item[dataCheckbox[6]] === true
        ) {
          return item;
        }

        break;
      case 8:
        if (
          item[dataCheckbox[0]] === true &&
          item[dataCheckbox[1]] === true &&
          item[dataCheckbox[2]] === true &&
          item[dataCheckbox[3]] === true &&
          item[dataCheckbox[4]] === true &&
          item[dataCheckbox[5]] === true &&
          item[dataCheckbox[6]] === true &&
          item[dataCheckbox[7]] === true
        ) {
          return item;
        }

        break;
      default:
        break;
    }
  });
};
