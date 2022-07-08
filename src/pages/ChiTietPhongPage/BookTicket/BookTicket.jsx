import React, { useState } from "react";
import { convertLocaleString } from "../../../utils/stringFormatUtils";
import RangeDatePicker from "../RangeDatePicker/RangeDatePicker";
import ChooseCustomer from "../../../components/ChooseCustomer/ChooseCustomer";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
export default function BookTicket({
    thongTinChiTietPhong = {},
    scrollTo = () => {},
    commentListSize = 0,
}) {
    const dispatch = useDispatch();
    const { daysOfBooking, bookingDate, customerInfo } = useSelector(
        (state) => state.chiTietPhongSlice
    );
    const [ableToBook, setAbleToBook] = useState(true);
    const countTotalCost = () => {
        return daysOfBooking * thongTinChiTietPhong.price;
    };
    const handleChooseCustomer = (totalCustomers, customerList) => {
        // setCustomerQuantity(totalCustomers);
        console.log(totalCustomers, customerList);
    };
    const handleBooking = () => {
        // const bookingData = {
        //     roomId: id,
        //     ...bookingTime,
        // };
        // console.log(bookingData);
        // dispatch(bookRoom(bookingData));
    };
    const onDatePickerChange = (key, data) => {
        // setBookingTime({
        //     checkIn: moment(data[0]).format(),
        //     checkOut: moment(data[1]).format(),
        // });
        console.log(data);
    };
    return (
        <div>
            <div className="border border-slate-300 rounded-md p-5 shadow ">
                <div className="flex justify-between items-center">
                    <span className="flex gap-2 items-center">
                        <span className="font-semibold text-xl">
                            đ {convertLocaleString(thongTinChiTietPhong.price)}
                        </span>
                        <span>/ đêm</span>
                    </span>
                    {/* <span className="flex gap-2 items-center">
                        <FontAwesomeIcon className="" icon={faMedal} />
                        <span
                            className=" underline  font-semibold cursor-pointer text-slate-500"
                            onClick={() => {
                                scrollTo("commentContainer");
                            }}
                        >
                            {commentListSize} đánh giá
                        </span>
                    </span> */}
                </div>

                <div className="my-5 border border-slate-300 rounded-md">
                    <div className="w-full flex relative pt-3 pb-8">
                        <div className="w-[1px] bg-slate-300 absolute top-0 left-1/2 h-full z-10"></div>
                        <div className="w-1/2 cursor-pointer pl-4">
                            <span className="font-semibold">Nhận phòng</span>
                        </div>
                        <div className="w-1/2 cursor-pointer pl-4">
                            <span className="font-semibold">Trả phòng</span>
                        </div>
                        <div className="absolute bottom-0 w-full">
                            <RangeDatePicker
                                onChange={onDatePickerChange}
                            ></RangeDatePicker>
                        </div>
                    </div>
                    <div className="w-full p-4 border-t cursor-pointer">
                        <div>
                            <ChooseCustomer
                                limit={thongTinChiTietPhong?.guests}
                                handleChooseCustomer={handleChooseCustomer}
                            ></ChooseCustomer>
                        </div>
                    </div>
                </div>
                <button
                    className={`${
                        !ableToBook
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 "
                    } text-center text-white font-semibold text-lg block py-2 w-full rounded-md hover:bg-gradient-to-l  duration-300 ease-in-out`}
                    // className="bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 text-center text-white font-semibold text-lg block py-2 w-full rounded-md hover:bg-gradient-to-l  duration-300 ease-in-out"
                    onClick={handleBooking}
                    disabled={!ableToBook}
                >
                    Đặt Phòng
                </button>
                <div className="mt-2">
                    <p className="text-gray-700 text-center">
                        Bạn vẫn chưa bị trừ tiền
                    </p>
                    <div className="flex justify-between text-lg text-gray-500">
                        <span className="underline">
                            <span>
                                đ{" "}
                                {convertLocaleString(
                                    thongTinChiTietPhong.price
                                )}{" "}
                                x {daysOfBooking} đêm
                            </span>
                        </span>
                        <span> đ {countTotalCost()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
