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

const dateFormat = "DD/MM/YYYY";

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
    let [searchInfo, setSearchInfo] = useState(
        {
            bookingLocation: {
                locationName: '',
            },
            bookingDate: {
                checkIn: moment(),
                checkOut: moment(),
            },
            totalCustomer: 0,
        },
    );
    useEffect(() => { //Re-render thanh searchInfo mini mỗi khi khách chọn lại thông tin
        setSearchInfo({
            bookingLocation: {
                locationName: ThongTinTimPhong.bookingLocation.locationName,
            },
            bookingDate: {
                checkIn: moment(ThongTinTimPhong.bookingDate.checkIn),
                checkOut: moment(ThongTinTimPhong.bookingDate.checkOut),
            },
            totalCustomer: ThongTinTimPhong.totalCustomer,
        });
    }, [ThongTinTimPhong])
    console.log(ThongTinTimPhong.bookingDate.checkIn, ThongTinTimPhong.bookingDate.checkOut);
    console.log(searchInfo.bookingDate.checkIn, searchInfo.bookingDate.checkOut);


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
        <div className="header w-full pt-5 pb-5 bg-white lg:shadow-md">
            <div className="header-container 
            mx-auto grid 
            lg:w-11/12 lg:grid-cols-12
            md:w-full md:grid-cols-12 px-2">
                <Link to={"/"} className='z-30'>
                    <div className="col-span-1 cursor-pointer md:w-36">
                        <img className="w-full" src="../img/airbnb-logo3.png" />
                    </div>
                </Link>
                <div className="search-bar-container col-span-8 w-full ml-10">
                    <div //Thanh searchInfo mini
                        className="bg-white flex items-center justify-center rounded-full cursor-pointer border border-gray-200 shadow-md hover:shadow-lg mx-auto px-2 py-2 w-fit"
                        onClick={handleSearchOpen}
                    >
                        <p
                            className="mr-2 px-2 my-auto font-bold"
                        >
                            {
                                _.trim(searchInfo.bookingLocation.locationName) === '' //Kiểm tra thông tin vị trí có tồn tại không
                                    ? 'Địa điểm bất kỳ'
                                    : searchInfo.bookingLocation.locationName
                            }
                        </p>
                        <p
                            className="mx-2 px-2 my-auto border-l border-r border-gray-400 font-bold"
                        >
                            {
                                ThongTinTimPhong.bookingDate.checkIn !== null && ThongTinTimPhong.bookingDate.checkOut !== null //Nếu localStorage chưa nhận giá trị thời gian nhận/trả phòng thì trả ra string rỗng
                                    ? _.trim(ThongTinTimPhong.bookingDate.checkIn) === 'NaN' && _.trim(ThongTinTimPhong.bookingDate.checkOut) === 'NaN' //Nếu localStorage đang lưu trữ giá trị checkIn/checkOut là string rỗng (Giá trị là number, nếu string rỗng => NaN) thì trả ra string rỗng
                                        ? 'Thời gian bất kỳ'
                                        : moment(ThongTinTimPhong.bookingDate.checkIn).format('M') === moment(ThongTinTimPhong.bookingDate.checkOut).format('M') //Nếu localStorage đang lưu trữ giá trị checkIn/checkOut là string ngày có giá trị thì trả ra đúng giá trị
                                            ? `Ngày ${moment(ThongTinTimPhong.bookingDate.checkIn).format('DD')} - ${moment(ThongTinTimPhong.bookingDate.checkOut).format('DD')} tháng ${moment(ThongTinTimPhong.bookingDate.checkOut).format('M')}` //Nếu thời gian nhận phòng và trả phòng cùng tháng
                                            : `Ngày ${moment(ThongTinTimPhong.bookingDate.checkIn).format('DD')} tháng ${moment(ThongTinTimPhong.bookingDate.checkIn).format('M')} - ${moment(ThongTinTimPhong.bookingDate.checkOut).format('DD')} tháng ${moment(searchInfo.bookingDate.checkOut).format('M')}` //Nếu thời gian nhận phòng và trả phòng khác tháng

                                    : 'Thời gian bất kỳ'
                            }
                        </p>
                        <p
                            className="ml-2 px-2 my-auto font-bold"
                        >
                            {
                                searchInfo.totalCustomer === 0
                                    ? 'Thêm khách'
                                    : `${searchInfo.totalCustomer} khách`
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
                <div className="col-span-3 flex justify-end z-30">
                    <div className="md:z-20">
                        <button
                            type="button"
                            className="bg-inherit border-none cursor-pointer rounded-full hover:bg-gray-100
                            md:w-36 md:text-xs
                            text-base px-4 h-10"
                        >
                            Trở thành chủ nhà
                        </button>
                    </div>
                    <div className="mx-3">
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
                        <div className="w-full h-fit pb-10 bg-white absolute z-20">
                            <div className="w-6/12 mx-auto">
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
