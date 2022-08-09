import React, { useState } from "react";
import { convertLocaleString } from "../../../utils/stringFormatUtils";
import RangeDatePicker from "../RangeDatePicker/RangeDatePicker";
import ChooseCustomer from "../../../components/ChooseCustomer/ChooseCustomer";
import { useDispatch, useSelector } from "react-redux";
import {
    setBookingDate,
    setCustomerInfo,
    bookRoom,
    setTotalCustomer,
} from "../../../redux/bookingRoomSlice";
import { countDays } from "../../../utils/timeMomentUtils";
import { useEffect } from "react";
import moment from "moment";
import {
    setAuthModal,
    setBookTicketModal,
} from "../../../redux/chiTietPhongSlice";
export default function BookTicket() {
    const dispatch = useDispatch();
    const { bookingDate, customerInfo, totalCustomer } = useSelector(
        (state) => state.bookingRoomSlice
    );

    const { thongTinChiTietPhong } = useSelector((state) => state.phongSlice);

    const { accessToken } = useSelector((state) => state.authSlice);

    const [daysOfBooking, setDaysOfBooking] = useState(0);
    const [ableToBook, setAbleToBook] = useState(true);
    useEffect(() => {
        const days = countDays(bookingDate?.checkIn, bookingDate?.checkOut);
        if (days) setDaysOfBooking(days);
        else setDaysOfBooking(0);
    }, [bookingDate]);

    useEffect(() => {
        let isAbleToBook = false;
        if (
            bookingDate?.checkIn &&
            bookingDate?.checkOut &&
            bookingDate?.checkIn != "" &&
            bookingDate?.checkIn != "Invalid date" &&
            bookingDate?.checkOut != "" &&
            bookingDate?.checkOut != "Invalid date" &&
            totalCustomer != 0
        )
            isAbleToBook = true;
        setAbleToBook(isAbleToBook);
    }, [bookingDate, totalCustomer]);
    useEffect(() => {
        if (accessToken) {
            dispatch(setAuthModal(false));
        }
    }, [accessToken]);
    const countTotalCost = () => {
        return daysOfBooking * thongTinChiTietPhong.price;
    };
    // const handleChooseCustomer = (totalCustomer, customerList) => {
    //     // setTotalCustomers(totalCustomer);
    //     const customerDataWithoutIndex = customerList.map((customerItem) => {
    //         return {
    //             customerType: customerItem.customerType,
    //             description: customerItem.description,
    //             quantity: customerItem.quantity,
    //         };
    //     });
    //     dispatch(setCustomerInfo(customerDataWithoutIndex));
    //     dispatch(setTotalCustomer(totalCustomer));
    // };
    const handleBooking = () => {
        if (accessToken && ableToBook) {
            const bookingData = {
                roomId: thongTinChiTietPhong._id,
                ...bookingDate,
            };
            dispatch(bookRoom(bookingData));
        } else if (!accessToken) {
            dispatch(setAuthModal(true));
        }
    };
    const onDatePickerChange = (key, data) => {
        data = data.map((date) => {
            return date == "" ? null : moment(date).format();
        });
        const newBookingDate = {
            checkIn: data[0],
            checkOut: data[1],
        };
        dispatch(setBookingDate(newBookingDate));
    };
    return (
        <div>
            <div className=" p-5  ">
                <div className="flex justify-between items-center">
                    <span className="flex gap-2 items-center">
                        <span className="font-semibold text-xl">
                            đ {convertLocaleString(thongTinChiTietPhong.price)}
                        </span>
                        <span>/ đêm</span>
                    </span>
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
                                defaultDate={bookingDate}
                                date={bookingDate}
                            ></RangeDatePicker>
                        </div>
                    </div>
                    <div className="w-full p-4 border-t cursor-pointer">
                        <ChooseCustomer
                            limit={thongTinChiTietPhong?.guests}
                            // handleChooseCustomer={handleChooseCustomer}
                        ></ChooseCustomer>
                    </div>
                </div>
                <button
                    className={`${
                        !ableToBook
                            ? "bg-gray-500 cursor-default px-2"
                            : "bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 "
                    } relative text-center text-white font-semibold text-lg block py-2 px-2 w-full rounded-md hover:bg-gradient-to-l  duration-300 ease-in-out`}
                    // className="bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 text-center text-white font-semibold text-lg block py-2 w-full rounded-md hover:bg-gradient-to-l  duration-300 ease-in-out"
                    onClick={handleBooking}
                    disabled={!ableToBook}
                >
                    <span>
                        {ableToBook
                            ? "Đặt phòng "
                            : "Vui lòng chọn ngày và số lượng khách"}
                    </span>
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
                        <span> đ {convertLocaleString(countTotalCost())}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
