import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getDanhSachPhong,
  getIdCurrent,
  getViTriChiTiet,
} from "../../redux/danhSachPhongSlice";
import { Link } from "react-router-dom";
import ModalChonPhong from "./ModalChonPhong";

export default function DanhSachPhongPage() {
  const { danhSachPhong } = useSelector((state) => state.danhSachPhongSlice);
  const { infoLocationDetail } = useSelector(
    (state) => state.danhSachPhongSlice
  );
  const { totalCustomer } = useSelector((state) => state.bookingRoomSlice);

  let { id } = useParams();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDanhSachPhong(id));
  }, [id, totalCustomer]);
  useEffect(() => {
    dispatch(getIdCurrent(id));
    dispatch(getViTriChiTiet(id));
  }, [id]);

  let renderDanhSachPhong = () => {
    return danhSachPhong?.map((item, index) => {
      return (
        <Link
          key={index}
          to={`/rooms/${item._id}`}
          className="text-current hover:text-current"
        >
          <div className="overflow-hidden rounded-lg shadow">
            <img
              className="w-full hover:scale-110 transition-all duration-300 object-cover"
              src={item.image}
              alt={item.image}
            />
          </div>
          <div className="mt-2 ">
            <div className="font-bold text-lg">{item.name}</div>
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: "1",
                display: "-webkit-box",
              }}
            >
              {item.locationId.name}
            </div>
            <div className="flex justify-start space-x-3">
              <div>{item.guests} khách,</div>
              <div>{item.bedRoom} phòng ngủ,</div>
              <div>{item.bath} bồn tắm</div>
            </div>
            <div>
              Giá:{" "}
              <span className="text-lg font-bold">
                {item.price.toLocaleString()} VND/ngày
              </span>
            </div>
          </div>
        </Link>
      );
    });
  };

  document.title = `Airbnb - ${infoLocationDetail?.name} - ${infoLocationDetail?.province}`;
  return (
    <>
      <div className="pt-5 pb-16">
        <ModalChonPhong />
        <div className="container mx-auto pt-5">
          {danhSachPhong?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {renderDanhSachPhong()}
            </div>
          ) : (
            <div className="text-2xl font-bold">
              Hiện tại không có phòng phù hợp, vui lòng quay lại sau.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
