import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBookTicketModal } from "../../../redux/chiTietPhongSlice";
import { convertLocaleString } from "../../../utils/stringFormatUtils";
export default function Footer() {
    const { thongTinChiTietPhong } = useSelector((state) => state.phongSlice);
    const dispatch = useDispatch();
    return (
        <div className="block lg:hidden fixed border-t-[1px] border-gray-300   py-3 px-5  w-full left-0 bottom-0 z-0 bg-white ">
            <div className="w-full h-full flex justify-between items-center px-2">
                <span className="flex gap-2 items-center">
                    <span className="font-semibold text-xl">
                        đ {convertLocaleString(thongTinChiTietPhong.price)}
                    </span>
                    <span>/ đêm</span>
                </span>
                <button
                    className={` bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 
                     relative text-center text-white font-semibold text-lg block py-2 px-5  rounded-md hover:bg-gradient-to-l  duration-300 ease-in-out`}
                    onClick={() => {
                        dispatch(setBookTicketModal(true));
                    }}
                >
                    <span>Đặt phòng</span>
                </button>
            </div>
        </div>
    );
}
