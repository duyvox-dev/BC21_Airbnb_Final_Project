import _ from "lodash";

export const INCREASE = 10;
export const DECLINE = -10;

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

export let handleDataReduce = (payload, selected) => {
  return _.sortBy(
    _.unionBy(
      payload?.reduce((arrNew, data) => {
        return [
          ...arrNew,
          selected === "guests"
            ? data.guests
            : selected === "bedRoom"
            ? data.bedRoom
            : data.bath,
        ];
      }, [])
    )
  );
};

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
