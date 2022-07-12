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
                        <div className="search-bar-inner w-full 
                        lg:grid lg:grid-cols-12 lg:bg-gray-100 lg:rounded-full lg:border-solid lg:border lg:border-neutral-300
                        md:grid md:grid-cols-12 md:bg-gray-100 md:rounded-full md:border-solid md:border md:border-neutral-300
                        sm:flex sm:flex-wrap sm:justify-center
                        xs:flex xs:flex-wrap xs:justify-center">
                            <Popover
                                className="location-input-block cursor-pointer
                                lg:col-span-5 lg:h-16 lg:rounded-full lg:px-5 lg:py-2
                                md:col-span-5 md:h-16 md:rounded-full md:px-5 md:py-2
                                sm:w-full sm:flex sm:flex-wrap sm:justify-center
                                xs:w-full xs:flex xs:flex-wrap xs:justify-center"
                                content={contentViTri}
                                title="Tìm kiếm phòng theo khu vực"
                                trigger="focus"
                            >
                                <label className="location-input-name w-full font-bold pointer-events-none
                                sm:text-lg sm:text-center sm:w-full
                                xs:text-lg xs:text-center xs:w-full">
                                    Địa điểm
                                </label>
                                <input
                                    value={formik.values.bookingLocation.locationName}
                                    className="location-input w-full bg-transparent border-none focus:outline-none
                                    sm:h-12 sm:w-full sm:text-center sm:border-solid sm:border sm:rounded-full sm:border-gray-200
                                    xs:h-12 xs:w-full xs:text-center xs:border-solid xs:border xs:rounded-full xs:border-gray-200"
                                    placeholder="Tìm kiếm phòng theo khu vực"
                                    name="bookingLocation.locationName"
                                    onChange={formik.handleChange}
                                />
                            </Popover>
                            <div className="date-input-block bg-transparent cursor-pointer
                            lg:col-span-4 lg:h-16 lg:flex lg:flex-row lg:flex-wrap lg:items-stretch lg:relative
                            md:col-span-4 md:h-16 md:flex md:flex-row md:flex-wrap md:items-stretch md:relative
                            sm:w-full sm:mt-5 sm:flex sm:flex-wrap sm:justify-center
                            xs:w-full xs:mt-5 xs:flex xs:flex-wrap xs:justify-center">
                                <div className="date-input-item
                                lg:w-6/12 lg:py-2 lg:relative
                                md:w-6/12 md:py-2 md:relative
                                sm:w-6/12 sm:flex sm:justify-center
                                xs:w-6/12 xs:flex xs:justify-center">
                                    <span className="date-input-name w-full pointer-events-none
                                    lg:absolute lg:z-20 lg:font-bold lg:flex lg:items-start lg:justify-center
                                    md:absolute md:z-20 md:font-bold md:flex md:items-start md:justify-center
                                    sm:text-lg sm:font-bold sm:text-center
                                    xs:text-lg xs:font-bold xs:text-center">
                                        Nhận phòng
                                    </span>
                                </div>
                                <div className="date-input-item
                                lg:w-6/12 lg:py-2 lg:relative
                                md:w-6/12 md:py-2 md:relative
                                sm:w-6/12 sm:flex sm:justify-center
                                xs:w-6/12 xs:flex xs:justify-center">
                                    <span className="date-input-name w-full pointer-events-none
                                    lg:absolute lg:z-20 lg:font-bold lg:flex lg:items-start lg:justify-center
                                    md:absolute md:z-20 md:font-bold md:flex md:items-start md:justify-center
                                    sm:text-lg sm:font-bold sm:text-center
                                    xs:text-lg xs:font-bold xs:text-center">
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
                            <div className="cursor-pointer 
                            lg:col-span-3 lg:h-16 lg:px-2 lg:rounded-full lg:flex lg:justify-between lg:hover:bg-gray-200
                            md:col-span-3 md:h-16 md:px-2 md:rounded-full md:flex md:justify-between md:hover:bg-gray-200
                            sm:w-full sm:mt-5 sm:flex sm:flex-wrap sm:justify-center
                            xs:w-full xs:mt-5 xs:flex xs:flex-wrap xs:justify-center">
                                <Popover
                                    overlayClassName="rounded-lg"
                                    className="w-full bg-transparent border-none
                                    lg:pl-3 lg:py-2
                                    md:pl-3 md:py-2
                                    sm:w-full sm:flex sm:flex-wrap sm:justify-center
                                    xs:w-full xs:flex xs:flex-wrap xs:justify-center"
                                    content={contentLoaitKhach}
                                    trigger="click"
                                >
                                    <label className="w-full font-bold pointer-events-none
                                    sm:text-lg sm:font-bold sm:text-center
                                    xs:text-lg xs:font-bold xs:text-center">
                                        Khách
                                    </label>
                                    <div
                                        className="w-full 
                                        sm:flex sm:items-center sm:justify-center sm:h-12 sm:border-solid sm:border sm:border-gray-200 sm:rounded-full
                                        xs:flex xs:items-center xs:justify-center xs:h-12 xs:border-solid xs:border xs:border-gray-200 xs:rounded-full"
                                    >
                                        {formik.values.totalCustomer > 0 ? (
                                            <p className="w-full text-gray-800 pointer-events-none
                                            sm:text-center sm:my-auto
                                            xs:text-center xs:my-auto">
                                                {formik.values.totalCustomer}{" "}
                                                khách
                                            </p>
                                        ) : (
                                            <p className="w-full text-gray-400 pointer-events-none
                                            sm:text-center sm:my-auto
                                            xs:text-center xs:my-auto">
                                                Chọn khách
                                            </p>
                                        )}
                                    </div>
                                </Popover>
                                <button
                                    className="border-none bg-rose-500 text-white cursor-pointer z-50 active:bg-rose-700 active:shadow-lg
                                    lg:rounded-full lg:w-14 lg:h-10 lg:my-auto lg:flex lg:items-center lg:justify-center
                                    md:rounded-full md:w-14 md:h-10 md:my-auto md:flex md:items-center md:justify-center
                                    sm:w-full sm:py-3 sm:mt-5 sm:rounded-lg
                                    xs:w-full xs:py-3 xs:mt-5 xs:rounded-lg"
                                    type="submit"
                                    onClick={formik.handleSubmit}
                                >
                                    <FontAwesomeIcon
                                        className="pointer-events-none xs:text-lg sm:text-lg"
                                        icon={faMagnifyingGlass}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab={<b>Trải nghiệm</b>} key="2">
                </TabPane>
            </Tabs>
        </div>
    )
}
