import React from "react";
import { useSelector } from "react-redux";

export default function PhongNgu() {
  const { danhSachPhong } = useSelector((state) => state.danhSachPhongSlice);
  const { dataGuests } = useSelector((state) => state.danhSachPhongSlice);
  const { dataBedRoom } = useSelector((state) => state.danhSachPhongSlice);
  const { dataBath } = useSelector((state) => state.danhSachPhongSlice);

  let renderSoLuongKhach = () => {
    return dataGuests?.map((item, index) => {
      return (
        <button
          value={item}
          key={index}
          onClick={(e) => console.log(e.target.value)}
          className="font-medium py-2 px-5 border rounded-2xl hover:border-black active:bg-black active:text-white focus:bg-black focus:text-white transition-all duration-300"
        >
          {item}
        </button>
      );
    });
  };

  let renderPhongNgu = () => {
    return dataBedRoom?.map((item, index) => {
      return (
        <button
          value={item}
          key={index}
          onClick={(e) => console.log(e.target.value)}
          className="font-medium py-2 px-5 border rounded-2xl hover:border-black active:bg-black active:text-white focus:bg-black focus:text-white transition-all duration-300"
        >
          {item}
        </button>
      );
    });
  };

  let renderPhongTam = () => {
    return dataBath?.map((item, index) => {
      return (
        <button
          value={item}
          key={index}
          onClick={(e) => console.log(e.target.value)}
          className="font-medium py-2 px-5 border rounded-2xl hover:border-black active:bg-black active:text-white focus:bg-black focus:text-white transition-all duration-300"
        >
          {item}
        </button>
      );
    });
  };

  return (
    <div className="py-8 border-b">
      <div className="text-xl font-medium pb-4">Khách và phòng ngủ</div>
      <div className="text-lg">Khách</div>
      <div className="flex justify-start p-4 space-x-4">
        <button
          value="0"
          onClick={(e) => console.log(e.target.value)}
          className="font-medium py-2 px-5 border rounded-2xl hover:border-black active:bg-black active:text-white focus:bg-black focus:text-white transition-all duration-300"
        >
          Bất kì
        </button>
        {renderSoLuongKhach()}
      </div>
      <div className="text-lg">Phòng ngủ</div>
      <div className="flex justify-start p-4 space-x-4">
        <button
          value="0"
          onClick={(e) => console.log(e.target.value)}
          className="font-medium py-2 px-5 border rounded-2xl hover:border-black active:bg-black active:text-white focus:bg-black focus:text-white transition-all duration-300"
        >
          Bất kì
        </button>
        {renderPhongNgu()}
      </div>
      <div className="text-lg">Phòng tắm</div>
      <div className="flex justify-start p-4 space-x-4">
        <button
          value="0"
          onClick={(e) => console.log(e.target.value)}
          className="font-medium py-2 px-5 border rounded-2xl hover:border-black active:bg-black active:text-white focus:bg-black focus:text-white transition-all duration-300"
        >
          Bất kì
        </button>
        {renderPhongTam()}
      </div>
    </div>
  );
}
