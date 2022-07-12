import { Tabs, DatePicker, Popover, message } from "antd";
import {
    faMagnifyingGlass,
    faMinus,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "antd/lib/menu/MenuItem";
import moment from "moment";
import _ from 'lodash';
import { useFormik } from "formik";
import { getDanhSachViTri, selectDanhSachViTri } from "../../../../redux/viTriSlice";
import { setBookingDate, setBookingLocation, setCustomerInfo, setTotalCustomer } from "../../../../redux/bookingRoomSlice";
import { localSearchStorageService } from "../../../../services/localService";
import styles from '../css/SearchForm.css';
import { closeSearchInput, searchAction } from "../../../../redux/pageSlice";

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

//Giá trị tăng giảm số lượng khách đặt phòng
const TangSoLuong = 1;
const GiamSoLuong = -1;
const dateFormat = "DD/MM/YYYY"; //Format datePicker

export default function SearchForm({ ThongTinTimPhong }) {

    let dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        //Gọi API lấy danh sách tất cả vị trí
        dispatch(getDanhSachViTri());
    }, []);

    let danhSachViTri = useSelector(selectDanhSachViTri);

    //Form lưu trữ thông tin tìm kiếm phòng khách nhập tại search bar
    const formik = useFormik({
        initialValues: {
            bookingLocation: {
                idLocation: ThongTinTimPhong.bookingLocation.idLocation,
                locationName: ThongTinTimPhong.bookingLocation.locationName,
            },
            bookingDate: {
                checkIn: ThongTinTimPhong.bookingDate.checkIn,
                checkOut: ThongTinTimPhong.bookingDate.checkOut,
            },
            customerInfo: ThongTinTimPhong.customerInfo,
            totalCustomer: ThongTinTimPhong.totalCustomer,
        },
        onSubmit: values => {
            if (values.bookingLocation.idLocation.trim() !== "") {
                dispatch(closeSearchInput()); //Close thanh tìm kiếm
                //Lưu trữ thông tin tìm phòng vào redux bookingRoomSlice
                dispatch(setBookingDate(values.bookingDate));
                dispatch(setBookingLocation(values.bookingLocation));
                dispatch(setCustomerInfo(values.customerInfo));
                dispatch(setTotalCustomer(values.totalCustomer));

                localSearchStorageService.setSearchInfoLocal(values); //Lưu trữ thông tin tìm phòng vào localStorage SEARCH_INFO
                //Chuyển trang danh sách phòng với vị trí chọn từ người dùnng
                navigate(`/search/${values.bookingLocation.idLocation}`);
            } else {
                message.error("Vui lòng chọn địa điểm bạn muốn tìm phòng");
            }
        }
    });

    //Render danh sách tất cả vị trí trong search bar
    const renderDanhSachViTri = () => {
        return danhSachViTri.map((viTri, index) => {
            return (
                <p
                    key={index}
                    className="cursor-pointer hover:bg-neutral-200"
                    onClick={() => {
                        formik.setFieldValue('bookingLocation.idLocation', viTri._id);
                        formik.setFieldValue('bookingLocation.locationName', viTri.name);
                    }}
                >
                    {viTri.name} | {viTri.province}
                </p>
            );
        });
    };

    //Truyền content vào popover địa điểm trong search bar
    const contentViTri = (
        <div className="h-52 overflow-y-scroll">{renderDanhSachViTri()}</div>
    );

    //Nhận giá trị từ ô input ngày nhận/trả phòng
    const onChangeDatePicker = (dates, dateStrings) => {
        if (dates) {
            let CheckIn = _.first(dates);
            let CheckOut = _.last(dates);
            formik.setFieldValue('bookingDate.checkIn', CheckIn);
            formik.setFieldValue('bookingDate.checkOut', CheckOut);
        } else {
            formik.setFieldValue('bookingDate.checkIn', null);
            formik.setFieldValue('bookingDate.checkOut', null);
        };
    };

    //Truyền value từ localSearchStorage vào RangePicker ngày nhận/trả phòng
    let DatePickerInitialValue = [
        formik.values.bookingDate.checkIn,
        formik.values.bookingDate.checkOut,
    ];

    //Hàm cho người dùng chọn số lượng từng loại khách trong search bar
    const ThayDoiSoLuongLoaiKhach = (customer, giaTri) => {
        let indexCustomerType = formik.values.customerInfo.findIndex((item) => { //Tìm index object loại khách đang thay đổi số lượng
            return item.customerType === customer;
        });
        let updateCustomerNumber = JSON.parse(JSON.stringify(formik.values.customerInfo));
        if (indexCustomerType !== -1) { //Thay đổi số lượng loại khách đã xác định
            updateCustomerNumber[indexCustomerType].quantity += giaTri;
            if (updateCustomerNumber[indexCustomerType].quantity < 0) {
                updateCustomerNumber[indexCustomerType].quantity = 0;
            };
        };
        //Tính tổng số khách của tất các phân loại khách
        let totalCustomerNumber = updateCustomerNumber.reduce((total, item) => {
            return (total += item.quantity);
        }, 0);
        formik.setFieldValue('totalCustomer', totalCustomerNumber);

        formik.setFieldValue('customerInfo', updateCustomerNumber);
    };
    //Render popover chọn số lượng từng loại khách trong search bar
    const renderLoaiKhach = () => {
        return formik.values.customerInfo.map((Khach, index) => {
            return (
                <div
                    key={index}
                    className="w-full mb-2 grid grid-cols-3 border-solid border-0 border-b border-b-neutral-300 pb-2"
                >
                    <div className="col-span-2 flex flex-wrap align-middle">
                        <p className="w-full my-auto font-bold">{Khach.customerType}</p>
                        <p className="w-full my-auto">{Khach.description}</p>
                    </div>
                    <div className="col-span-1 ml-3 flex justify-between items-center">
                        <button
                            className="w-8 h-8 rounded-full cursor-pointer border border-neutral-300 active:shadow-lg active:bg-neutral-300"
                            onClick={() => {
                                ThayDoiSoLuongLoaiKhach(Khach.customerType, GiamSoLuong);
                            }}
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <p className="my-auto">{Khach.quantity}</p>
                        <button
                            className="w-8 h-8 rounded-full cursor-pointer border border-neutral-300 active:shadow-lg active:bg-neutral-300"
                            onClick={() => {
                                ThayDoiSoLuongLoaiKhach(Khach.customerType, TangSoLuong);
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
            );
        });
    };

    //Truyền content vào popover chọn số lượng từng loại khách trong search bar
    const contentLoaitKhach = <div className="w-full">{renderLoaiKhach()}</div>;

    return (
        <div className="search-form-main">
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab={<b>Chỗ ở</b>} key="1">
                    <div className="search-bar-container">
                        <div className="search-bar-inner w-full grid grid-cols-12 bg-gray-100 rounded-full border-solid border border-neutral-300">
                            <Popover
                                className="location-input-block col-span-5 h-16 rounded-full px-5 py-2 cursor-pointer"
                                content={contentViTri}
                                title="Tìm kiếm phòng theo khu vực"
                                trigger="focus"
                            >
                                <label className="location-input-name w-full font-bold pointer-events-none">
                                    Địa điểm
                                </label>
                                <input
                                    value={formik.values.bookingLocation.locationName}
                                    className="location-input w-full bg-transparent border-none focus:outline-none"
                                    placeholder="Tìm kiếm phòng theo khu vực"
                                    name="bookingLocation.locationName"
                                    onChange={formik.handleChange}
                                />
                            </Popover>
                            <div className="date-input-block col-span-4 h-16 bg-transparent cursor-pointer flex flex-row flex-wrap items-stretch relative">
                                <div className="date-input-item w-6/12 py-2 relative">
                                    <span className="date-input-name w-full absolute z-20 font-bold flex items-start justify-center pointer-events-none">
                                        Nhận phòng
                                    </span>
                                </div>
                                <div className="date-input-item w-6/12 py-2 relative">
                                    <span className="date-input-name w-full absolute z-20 font-bold flex items-start justify-center pointer-events-none">
                                        Trả phòng
                                    </span>
                                </div>
                                <RangePicker
                                    className="date-picker-container"
                                    format={dateFormat}
                                    onChange={onChangeDatePicker}
                                    defaultValue={
                                        formik.values.bookingDate.checkIn !== null && formik.values.bookingDate.checkOut !== null //Nếu localStorage chưa nhận giá trị thì trả ra string rỗng
                                            ? _.trim(formik.values.bookingDate.checkIn) === 'NaN' && _.trim(formik.values.bookingDate.checkOut) === 'NaN' //Nếu localStorage đang lưu trữ giá trị checkIn/checkOut là string rỗng (Giá trị là number, nếu string rỗng => NaN) thì trả ra string rỗng
                                                ? ''
                                                : DatePickerInitialValue //Nếu localStorage đang lưu trữ giá trị checkIn/checkOut là string ngày có giá trị thì trả ra đúng giá trị
                                            : ''
                                    }
                                />
                            </div>
                            <div className="col-span-3 h-16 px-2 rounded-full flex justify-between cursor-pointer hover:bg-gray-200">
                                <Popover
                                    overlayClassName="rounded-lg"
                                    className="pl-3 py-2 w-full bg-transparent border-none"
                                    content={contentLoaitKhach}
                                    trigger="click"
                                >
                                    <label className="w-full font-bold pointer-events-none">
                                        Khách
                                    </label>
                                    {formik.values.totalCustomer > 0 ? (
                                        <p className="w-full text-gray-800 pointer-events-none">
                                            {formik.values.totalCustomer}{" "}
                                            khách
                                        </p>
                                    ) : (
                                        <p className="w-full text-gray-400 pointer-events-none">
                                            Chọn khách
                                        </p>
                                    )}
                                </Popover>
                                <button
                                    className="rounded-full w-14 h-10 my-auto border-none bg-rose-500 text-white cursor-pointer z-50 active:bg-rose-700 active:shadow-lg flex items-center justify-center"
                                    type="submit"
                                    onClick={formik.handleSubmit}
                                >
                                    <FontAwesomeIcon
                                        className="pointer-events-none"
                                        icon={faMagnifyingGlass}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab={<b>Trải nghiệm</b>} key="2">
                    <div className="search-bar-container">
                        <div className="search-bar-inner w-full grid grid-cols-12 bg-gray-100 rounded-full border-solid border border-neutral-300">
                            <Popover
                                className="location-input-block col-span-5 h-16 rounded-full px-5 py-2 cursor-pointer"
                                content={contentViTri}
                                title="Tìm kiếm phòng theo khu vực"
                                trigger="focus"
                            >
                                <label className="location-input-name w-full font-bold pointer-events-none">
                                    Địa điểm
                                </label>
                                <input
                                    value={formik.values.bookingLocation.locationName}
                                    className="location-input w-full bg-transparent border-none focus:outline-none"
                                    placeholder="Tìm kiếm phòng theo khu vực"
                                    name="bookingLocation.locationName"
                                    onChange={formik.handleChange}
                                />
                            </Popover>
                            <div className="date-input-block col-span-4 h-16 bg-transparent cursor-pointer flex flex-row flex-wrap items-stretch relative">
                                <div className="date-input-item w-6/12 py-2 relative">
                                    <span className="date-input-name w-full absolute z-20 font-bold flex items-start justify-center pointer-events-none">
                                        Nhận phòng
                                    </span>
                                </div>
                                <div className="date-input-item w-6/12 py-2 relative">
                                    <span className="date-input-name w-full absolute z-20 font-bold flex items-start justify-center pointer-events-none">
                                        Trả phòng
                                    </span>
                                </div>
                                <RangePicker
                                    className="date-picker-container"
                                    format={dateFormat}
                                    onChange={onChangeDatePicker}
                                    defaultValue={
                                        formik.values.bookingDate.checkIn !== null && formik.values.bookingDate.checkOut !== null
                                            ? DatePickerInitialValue
                                            : ''
                                    }
                                />
                            </div>
                            <div className="col-span-3 h-16 px-2 rounded-full flex justify-between cursor-pointer hover:bg-gray-200">
                                <Popover
                                    overlayClassName="rounded-lg"
                                    className="pl-3 py-2 w-full bg-transparent border-none"
                                    content={contentLoaitKhach}
                                    trigger="click"
                                >
                                    <label className="w-full font-bold pointer-events-none">
                                        Khách
                                    </label>
                                    {formik.values.totalCustomer > 0 ? (
                                        <p className="w-full text-gray-800 pointer-events-none">
                                            {formik.values.totalCustomer}{" "}
                                            khách
                                        </p>
                                    ) : (
                                        <p className="w-full text-gray-400 pointer-events-none">
                                            Chọn khách
                                        </p>
                                    )}
                                </Popover>
                                <button
                                    className="rounded-full w-14 h-12 my-auto border-none bg-rose-500 text-white cursor-pointer z-50 active:bg-rose-700 active:shadow-lg"
                                    type="submit"
                                >
                                    <FontAwesomeIcon
                                        className="pointer-events-none"
                                        icon={faMagnifyingGlass}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}
