import { Menu, Transition } from "@headlessui/react";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import {
    faBars,
    faGlobe,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
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
import _ from "lodash";
import { useFormik } from "formik";
import SearchForm from "./SearchForm/SearchForm";
import {
    closeSearchInput,
    openSearchInput,
    selectIsSearchInputOpen,
} from "../../../redux/pageSlice";

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
    useEffect(() => {
        //Re-render thanh searchInfo mini mỗi khi khách chọn lại thông tin
        formik.setFieldValue(
            "bookingLocation.locationName",
            ThongTinTimPhong.bookingLocation.locationName
        );
        formik.setFieldValue(
            "bookingDate.checkIn",
            ThongTinTimPhong.bookingDate.checkIn
        );
        formik.setFieldValue(
            "bookingDate.checkOut",
            ThongTinTimPhong.bookingDate.checkOut
        );
        formik.setFieldValue("totalCustomer", ThongTinTimPhong.totalCustomer);
    }, [ThongTinTimPhong]);

    //State điều khiển hiển thị thanh searchForm
    let isSearchOpen = useSelector(selectIsSearchInputOpen);
    const handleSearchOpen = () => {
        if (isSearchOpen) {
            dispatch(closeSearchInput());
        } else {
            dispatch(openSearchInput());
        }
    };
    const ref = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current?.contains(event.target)) {
                dispatch(closeSearchInput());
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
    }, [ref]);

    return (
        <div className="fixed z-20 flex justify-center w-full pt-5 pb-5 bg-white border-b header lg:flex-none lg:h-fit md:flex-none md:h-fit h-32">
            <div className="fixed top-0 left-0 z-20 w-full bg-white py-5 flex justify-between px-5 md:px-16 ">
                <div className="w-32 cursor-pointer md:w-28  lg:w-40  md:mt-[10px]  lg:mt-0">
                    <Link to={"/"}>
                        <img className="w-full" src="../img/airbnb-logo3.png" />
                    </Link>
                </div>
                <div className="search-bar-container absolute -bottom-7 left-[50%] -translate-x-1/2 min-w-[90%] md:min-w-0 md:bottom-4">
                    <div //Thanh searchInfo mini
                        className="flex items-center justify-center px-1 py-1 mx-auto mt-3 bg-white border border-gray-200 rounded-full shadow-md cursor-pointer hover:shadow-lg w-fit lg:px-2 lg:py-2 lg:mt-0 md:px-2 md:py-2 md:mt-0"
                        onClick={handleSearchOpen}
                    >
                        <p className="pr-1 my-auto text-xs font-normal text-center lg:pr-2 lg:font-bold lg:text-base md:pr-2 md:font-bold">
                            {_.trim(
                                formik.values.bookingLocation.locationName
                            ) === "" //Kiểm tra thông tin vị trí có tồn tại không
                                ? "Địa điểm bất kỳ"
                                : formik.values.bookingLocation.locationName}
                        </p>
                        <p className="px-1 my-auto text-xs font-normal text-center border-l border-r border-gray-400 lg:px-2 lg:font-bold lg:text-base md:px-2 md:font-bold">
                            {formik.values.bookingDate.checkIn !== null &&
                            formik.values.bookingDate.checkOut !== null //Nếu localStorage chưa nhận giá trị thời gian nhận/trả phòng thì trả ra string rỗng
                                ? _.trim(formik.values.bookingDate.checkIn) ===
                                      "NaN" &&
                                  _.trim(formik.values.bookingDate.checkOut) ===
                                      "NaN" //Nếu localStorage đang lưu trữ giá trị checkIn/checkOut là string rỗng (Giá trị là number, nếu string rỗng => NaN) thì trả ra string rỗng
                                    ? "Thời gian bất kỳ"
                                    : `Ngày ${moment(
                                          formik.values.bookingDate.checkIn
                                      ).format("DD/MM")} - ${moment(
                                          formik.values.bookingDate.checkOut
                                      ).format("DD/MM")}` //Nếu thời gian nhận phòng và trả phòng khác tháng
                                : "Thời gian bất kỳ"}
                        </p>
                        <p className="px-1 my-auto text-xs font-normal text-center lg:px-2 lg:font-bold lg:text-base md:px-2 md:font-bold">
                            {formik.values.totalCustomer === 0
                                ? "Thêm khách"
                                : `${formik.values.totalCustomer} khách`}
                        </p>
                        <button className="flex items-center justify-center text-white rounded-full bg-rose-500 w-9 h-9">
                            <FontAwesomeIcon
                                className="pointer-events-none"
                                icon={faMagnifyingGlass}
                            />
                        </button>
                    </div>
                </div>
                {/* User menu */}
                <div className=" lg:flex lg:justify-end lg:items-center lg:col-span-3 lg:static md:flex md:justify-end md:items-center md:col-span-3 md:static">
                    <div className="">
                        <Menu
                            as="div"
                            className="relative inline-block text-left"
                        >
                            <div>
                                <Menu.Button className="flex items-center justify-between w-20 h-10 p-2 text-sm font-medium text-black transition-all duration-300 bg-white border rounded-3xl hover:shadow-lg border-stone-400">
                                    <FontAwesomeIcon
                                        className="w-4 h-4"
                                        icon={faBars}
                                    />

                                    {userLogin ? (
                                        userLogin.avatar ? (
                                            <img
                                                className="rounded-full w-9 h-9"
                                                src={userLogin.avatar}
                                                alt={userLogin.avatar}
                                            />
                                        ) : (
                                            <img
                                                className="rounded-full w-9 h-9"
                                                src={userPic}
                                                alt={userPic}
                                            />
                                        )
                                    ) : (
                                        <FontAwesomeIcon
                                            className="w-8 h-8"
                                            icon={faCircleUser}
                                        />
                                    )}
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg -left-12 w-44 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-2">
                                        {userLogin ? (
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        className="w-full h-full text-black hover:text-black"
                                                        to={`/user/${userLogin._id}`}
                                                    >
                                                        <button
                                                            className={`${
                                                                active
                                                                    ? "bg-gray-100 font-bold"
                                                                    : ""
                                                            } group w-full h-12 text-left items-center rounded-md px-3 text-sm transition-all cursor-pointer`}
                                                        >
                                                            Tài khoản
                                                        </button>
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        ) : (
                                            <>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            className="w-full h-full text-black hover:text-black"
                                                            to={"/register"}
                                                        >
                                                            <button
                                                                className={`${
                                                                    active
                                                                        ? "bg-gray-100 font-bold"
                                                                        : ""
                                                                } group w-full h-12 text-left items-center rounded-md px-3 text-sm transition-all cursor-pointer`}
                                                            >
                                                                Đăng ký
                                                            </button>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            className="w-full h-full text-black hover:text-black"
                                                            to={"/login"}
                                                        >
                                                            <button
                                                                className={`${
                                                                    active
                                                                        ? "bg-gray-100 font-bold"
                                                                        : ""
                                                                } group w-full h-12 text-left items-center rounded-md px-3 text-sm transition-all cursor-pointer`}
                                                            >
                                                                Đăng nhập
                                                            </button>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </>
                                        )}
                                        <hr />
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${
                                                        active
                                                            ? "bg-gray-100 font-bold"
                                                            : ""
                                                    } group w-full h-12 text-left items-center rounded-md px-3 text-sm transition-all cursor-pointer`}
                                                >
                                                    Cho thuê nhà
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${
                                                        active
                                                            ? "bg-gray-100 font-bold"
                                                            : ""
                                                    } group w-full h-12 text-left items-center rounded-md px-3 text-sm transition-all cursor-pointer`}
                                                >
                                                    Tổ chức trải nghiệm
                                                </button>
                                            )}
                                        </Menu.Item>
                                        {userLogin ? (
                                            <>
                                                <hr />
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${
                                                                active
                                                                    ? "bg-gray-100 font-bold"
                                                                    : ""
                                                            } group w-full h-12 text-left items-center rounded-md px-3 text-sm transition-all cursor-pointer`}
                                                            onClick={() =>
                                                                handleLogout()
                                                            }
                                                        >
                                                            Đăng xuất
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>
            {isSearchOpen ? (
                <div className="absolute top-0 z-20 w-full">
                    <div className="fixed inset-0 z-20 bg-black/30" ref={ref} />
                    <div className="absolute z-20 w-full pb-5 bg-white h-fit lg:pb-10">
                        <div className="w-11/12 mx-auto lg:w-6/12 md:mt-5">
                            <SearchForm ThongTinTimPhong={ThongTinTimPhong} />
                        </div>
                    </div>
                </div>
            ) : (
                <Fragment />
            )}
        </div>
    );
}
