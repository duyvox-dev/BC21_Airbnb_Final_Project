import { Popover, Menu } from "antd";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faGlobe, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userPic from "../../../assets/img/user_pic.png";
import styled from "../css/HeaderTemplate.css";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "antd/lib/menu/MenuItem";
import { dangXuat } from "../../../redux/authSlice";
import { selectThongTinTimPhong } from "../../../redux/bookingRoomSlice";
import moment from "moment";
import _ from 'lodash';
import { useFormik } from "formik";
import SearchForm from "./SearchForm/SearchForm";
import { closeSearchInput, openSearchInput, selectIsSearchInputOpen } from "../../../redux/pageSlice";

export default function HeaderTemplate() {
    const { userLogin } = useSelector((state) => state.authSlice);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    //Lấy thông tin tìm phòng của người dùng từ localSearchStorage
    let ThongTinTimPhong = useSelector(selectThongTinTimPhong);

    //Điều khiển hiển thị popover menu người dùng
    const [visible, setVisible] = useState(false);
    const hide = () => {
        setVisible(false);
    };
    const handleVisibleChange = (newVisible) => {
        setVisible(newVisible);
    };

    //Hàm xử lý đăng xuất cho người dùng
    let handleLogout = () => {
        dispatch(dangXuat());
        navigate("/");
    };

    //Truyền content vào popover menu người dùng
    const contentMenuBar = (
        <Menu className="w-52">
            {userLogin ? (
                <MenuItem className="w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300">
                    <Link to={`/user/${userLogin._id}`}>Tài khoản</Link>
                </MenuItem>
            ) : (
                <>
                    <MenuItem className="w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300">
                        <Link to={"/register"}>Đăng ký</Link>
                    </MenuItem>
                    <MenuItem className="w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300">
                        <Link to={"/login"}>Đăng nhập</Link>
                    </MenuItem>
                </>
            )}
            <MenuItem className="w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300">
                <Link to={"/"}>Cho thuê nhà</Link>
            </MenuItem>
            <MenuItem className="w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300">
                <Link to={"/"}>Tổ chức trải nghiệm</Link>
            </MenuItem>
            {userLogin ? (
                <MenuItem
                    onClick={() => handleLogout()}
                    className="w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300"
                >
                    Đăng xuất
                </MenuItem>
            ) : (
                ""
            )}
        </Menu>
    );

    //State lưu trữ thông tin tìm phòng của người dùng
    let formik = useFormik({
        initialValues: {
            bookingLocation: {
                locationName: ThongTinTimPhong.bookingLocation.locationName,
            },
            bookingDate: {
                checkIn: ThongTinTimPhong.bookingDate.checkIn,
                checkOut: ThongTinTimPhong.bookingDate.checkOut,
            },
            totalCustomer: ThongTinTimPhong.totalCustomer,
        },
    });
    useEffect(() => { //Re-render thanh searchInfo mini mỗi khi khách chọn lại thông tin
        formik.setFieldValue('bookingLocation.locationName', ThongTinTimPhong.bookingLocation.locationName);
        formik.setFieldValue('bookingDate.checkIn', ThongTinTimPhong.bookingDate.checkIn);
        formik.setFieldValue('bookingDate.checkOut', ThongTinTimPhong.bookingDate.checkOut);
        formik.setFieldValue('totalCustomer', ThongTinTimPhong.totalCustomer);
    }, [ThongTinTimPhong])

    //State điều khiển hiển thị thanh searchForm
    let isSearchOpen = useSelector(selectIsSearchInputOpen);
    const handleSearchOpen = () => {
        if (isSearchOpen) {
            dispatch(closeSearchInput());
        } else {
            dispatch(openSearchInput());
        };
    };
    const ref = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current?.contains(event.target)) {
                dispatch(closeSearchInput());
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
    }, [ref]);

    return (
        <div className="header w-full pt-5 pb-5 bg-white 
        lg:shadow-md
        sm:h-28 sm:flex sm:justify-center sm:bg-transparent
        xs:h-28 xs:flex xs:justify-center xs:bg-transparent">
            <div className="header-container mx-auto 
            lg:grid lg:w-11/12 lg:grid-cols-12
            md:grid md:w-11/12 md:grid-cols-12
            sm:fixed sm:z-20 sm:top-0 sm:h-32 sm:w-full sm:px-2 sm:pt-2 sm:bg-white
            xs:fixed xs:z-20 xs:top-0 xs:h-32 xs:w-full xs:px-2 xs:pt-2 xs:bg-white">
                <Link to={"/"}
                    className=' z-30 xs:w-fit sm:w-fit
                md:w-fit md:flex md:items-center
                lg:w-fit lg:flex lg:items-center'>
                    <div className="cursor-pointer 
                    xs:w-32 
                    sm:w-32
                    md:w-28 md:col-span-1
                    lg:w-40 lg:col-span-1">
                        <img className="w-full" src="../img/airbnb-logo3.png" />
                    </div>
                </Link>
                <div
                    className="search-bar-container w-full 
                lg:ml-10 lg:col-span-8
                md:ml-12 md:col-span-8">
                    <div //Thanh searchInfo mini
                        className="bg-white flex items-center justify-center rounded-full cursor-pointer border border-gray-200 shadow-md hover:shadow-lg mx-auto w-fit
                        lg:px-2 lg:py-2
                        md:px-2 md:py-2
                        sm:mt-3 sm:px-1 sm:py-1
                        xs:mt-3 xs:px-1 xs:py-1"
                        onClick={handleSearchOpen}
                    >
                        <p
                            className="my-auto font-bold 
                            lg:pr-2 
                            md:pr-2
                            sm:text-center sm:text-xs sm:font-normal sm:pr-1
                            xs:text-center xs:text-xs xs:font-normal xs:pr-1"
                        >
                            {
                                _.trim(formik.values.bookingLocation.locationName) === '' //Kiểm tra thông tin vị trí có tồn tại không
                                    ? 'Địa điểm bất kỳ'
                                    : formik.values.bookingLocation.locationName
                            }
                        </p>
                        <p
                            className="my-auto border-l border-r border-gray-400 font-bold
                            lg:px-2 
                            md:px-2
                            sm:text-center sm:text-xs sm:font-normal sm:px-1
                            xs:text-center xs:text-xs xs:font-normal xs:px-1"
                        >
                            {
                                formik.values.bookingDate.checkIn !== null && formik.values.bookingDate.checkOut !== null //Nếu localStorage chưa nhận giá trị thời gian nhận/trả phòng thì trả ra string rỗng
                                    ? _.trim(formik.values.bookingDate.checkIn) === 'NaN' && _.trim(formik.values.bookingDate.checkOut) === 'NaN' //Nếu localStorage đang lưu trữ giá trị checkIn/checkOut là string rỗng (Giá trị là number, nếu string rỗng => NaN) thì trả ra string rỗng
                                        ? 'Thời gian bất kỳ'
                                        : `Ngày ${moment(formik.values.bookingDate.checkIn).format('DD/MM')} - ${moment(formik.values.bookingDate.checkOut).format('DD/MM')}` //Nếu thời gian nhận phòng và trả phòng khác tháng
                                    : 'Thời gian bất kỳ'
                            }
                        </p>
                        <p
                            className="my-auto font-bold
                            lg:px-2 
                            md:px-2
                            sm:text-center sm:text-xs sm:font-normal sm:px-1
                            xs:text-center xs:text-xs xs:font-normal xs:px-1"
                        >
                            {
                                formik.values.totalCustomer === 0
                                    ? 'Thêm khách'
                                    : `${formik.values.totalCustomer} khách`
                            }
                        </p>
                        <button
                            className="bg-rose-500 text-white rounded-full flex items-center justify-center w-9 h-9"
                        >
                            <FontAwesomeIcon
                                className="pointer-events-none"
                                icon={faMagnifyingGlass}
                            />
                        </button>
                    </div>
                </div>
                <div className="z-30 xs:absolute xs:top-2 xs:right-2
                sm:absolute sm:top-2 sm:right-2
                lg:flex lg:justify-end lg:items-center lg:col-span-3 
                md:flex md:justify-end md:items-center md:col-span-3">
                    <div className="md:hidden xs:hidden sm:hidden">
                        <button
                            type="button"
                            className="bg-inherit border-none cursor-pointer rounded-full hover:bg-gray-100
                            md:w-36 md:text-xs
                            lg:text-base lg:px-4 lg:h-10"
                        >
                            Trở thành chủ nhà
                        </button>
                    </div>
                    <div className="mx-3 xs:hidden sm:hidden">
                        <button className="bg-inherit border-none cursor-pointer rounded-full hover:bg-gray-100 
                        text-base w-10 h-10">
                            <FontAwesomeIcon icon={faGlobe} />
                        </button>
                    </div>
                    <div>
                        <Popover
                            className="rounded-full cursor-pointer flex justify-between items-center bg-white border-solid border border-neutral-300 hover:shadow-lg
                            pl-3 pr-1 w-20 h-10"
                            content={<a onClick={hide}>{contentMenuBar}</a>}
                            trigger="click"
                            visible={visible}
                            onVisibleChange={handleVisibleChange}
                        >
                            <FontAwesomeIcon
                                className="text-base"
                                icon={faBars}
                            />
                            {userLogin ? (
                                <img
                                    style={{ width: 35, height: 35 }}
                                    className="rounded-full"
                                    src={
                                        userLogin.avatar
                                            ? userLogin.avatar
                                            : userPic
                                    }
                                    alt="user-avatar"
                                />
                            ) : (
                                <FontAwesomeIcon
                                    className="text-3xl"
                                    icon={faCircleUser}
                                />
                            )}
                        </Popover>
                    </div>
                </div>
            </div>
            {
                isSearchOpen
                    ? <div className="w-full absolute z-20 top-0">
                        <div className="bg-black/30 fixed inset-0 z-20" ref={ref} />
                        <div className="w-full h-fit bg-white absolute z-20
                        lg:pb-10
                        md:pb-5
                        sm:pb-5
                        xs:pb-5">
                            <div className="mx-auto
                            lg:w-6/12 
                            md:w-11/12 md:mt-5
                            sm:w-11/12
                            xs:w-11/12">
                                <SearchForm
                                    ThongTinTimPhong={ThongTinTimPhong}
                                />
                            </div>
                        </div>
                    </div>
                    : <Fragment />
            }
        </div>
    );
}
