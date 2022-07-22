import { Popover, Menu } from "antd";
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

  //Truyền content vào popover menu người dùng
  const contentMenuBar = (
    <Menu className="w-52">
      {userLogin ? (
        <MenuItem className="w-full pb-2 text-base border-0 border-b border-solid border-b-neutral-300 hover:bg-neutral-300">
          <Link to={`/user/${userLogin._id}`}>Tài khoản</Link>
        </MenuItem>
      ) : (
        <>
          <MenuItem className="w-full pb-2 text-base border-0 border-b border-solid border-b-neutral-300 hover:bg-neutral-300">
            <Link to={"/register"}>Đăng ký</Link>
          </MenuItem>
          <MenuItem className="w-full pb-2 text-base border-0 border-b border-solid border-b-neutral-300 hover:bg-neutral-300">
            <Link to={"/login"}>Đăng nhập</Link>
          </MenuItem>
        </>
      )}
      <MenuItem className="w-full pb-2 text-base border-0 border-b border-solid border-b-neutral-300 hover:bg-neutral-300">
        <Link to={"/"}>Cho thuê nhà</Link>
      </MenuItem>
      <MenuItem className="w-full pb-2 text-base border-0 border-b border-solid border-b-neutral-300 hover:bg-neutral-300">
        <Link to={"/"}>Tổ chức trải nghiệm</Link>
      </MenuItem>
      {userLogin ? (
        <MenuItem
          onClick={() => handleLogout()}
          className="w-full pb-2 text-base border-0 border-b border-solid border-b-neutral-300 hover:bg-neutral-300"
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
    <div className="fixed z-10 flex justify-center w-full pt-5 pb-5 bg-white header lg:flex-none lg:shadow-md lg:h-fit md:flex-none md:h-fit h-28">
      <div className="fixed top-0 left-0 z-20 w-full h-32 pt-2 bg-white header-container lg:grid lg:w-11/12 lg:mx-auto lg:grid-cols-12 lg:static lg:h-fit lg:px-0 lg:pt-0 lg:bg-none md:grid md:w-11/12 md:mx-auto md:grid-cols-12 md:static md:h-fit md:px-0 md:pt-0 md:bg-none">
        <div className="w-32 cursor-pointer md:w-28 md:col-span-1 lg:w-40 lg:col-span-1">
          <Link to={"/"}>
            <img className="w-full" src="../img/airbnb-logo3.png" />
          </Link>
        </div>
        <div className="search-bar-container lg:ml-10 lg:col-span-8 md:ml-12 md:col-span-8">
          <div //Thanh searchInfo mini
            className="flex items-center justify-center px-1 py-1 mx-auto mt-3 bg-white border border-gray-200 rounded-full shadow-md cursor-pointer hover:shadow-lg w-fit lg:px-2 lg:py-2 lg:mt-0 md:px-2 md:py-2 md:mt-0"
            onClick={handleSearchOpen}
          >
            <p className="pr-1 my-auto text-xs font-normal text-center lg:pr-2 lg:font-bold lg:text-base md:pr-2 md:font-bold">
              {_.trim(formik.values.bookingLocation.locationName) === "" //Kiểm tra thông tin vị trí có tồn tại không
                ? "Địa điểm bất kỳ"
                : formik.values.bookingLocation.locationName}
            </p>
            <p className="px-1 my-auto text-xs font-normal text-center border-l border-r border-gray-400 lg:px-2 lg:font-bold lg:text-base md:px-2 md:font-bold">
              {formik.values.bookingDate.checkIn !== null &&
              formik.values.bookingDate.checkOut !== null //Nếu localStorage chưa nhận giá trị thời gian nhận/trả phòng thì trả ra string rỗng
                ? _.trim(formik.values.bookingDate.checkIn) === "NaN" &&
                  _.trim(formik.values.bookingDate.checkOut) === "NaN" //Nếu localStorage đang lưu trữ giá trị checkIn/checkOut là string rỗng (Giá trị là number, nếu string rỗng => NaN) thì trả ra string rỗng
                  ? "Thời gian bất kỳ"
                  : `Ngày ${moment(formik.values.bookingDate.checkIn).format(
                      "DD/MM"
                    )} - ${moment(formik.values.bookingDate.checkOut).format(
                      "DD/MM"
                    )}` //Nếu thời gian nhận phòng và trả phòng khác tháng
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
        <div className="absolute z-30 top-2 right-2 lg:flex lg:justify-end lg:items-center lg:col-span-3 lg:static md:flex md:justify-end md:items-center md:col-span-3 md:static">
          <div className="absolute -z-20 lg:static">
            <button
              type="button"
              className="text-transparent border-none rounded-full cursor-pointer bg-inherit md:w-36 md:text-xs lg:w-fit lg:text-base lg:px-4 lg:h-10 lg:text-black lg:hover:bg-gray-100"
            >
              Trở thành chủ nhà
            </button>
          </div>
          <div className="absolute mx-3 -z-20 lg:static">
            <button className="w-10 h-10 text-base border-none rounded-full cursor-pointer bg-inherit lg:hover:bg-gray-100">
              <FontAwesomeIcon
                className="text-transparent lg:text-black"
                icon={faGlobe}
              />
            </button>
          </div>
          <div>
            <Popover
              className="flex items-center justify-between w-20 h-10 pl-3 pr-1 bg-white border border-solid rounded-full cursor-pointer border-neutral-300 hover:shadow-lg"
              content={<a onClick={hide}>{contentMenuBar}</a>}
              trigger="click"
              visible={visible}
              onVisibleChange={handleVisibleChange}
            >
              <FontAwesomeIcon className="text-base" icon={faBars} />
              {userLogin ? (
                <img
                  style={{ width: 35, height: 35 }}
                  className="rounded-full"
                  src={userLogin.avatar ? userLogin.avatar : userPic}
                  alt="user-avatar"
                />
              ) : (
                <FontAwesomeIcon className="text-3xl" icon={faCircleUser} />
              )}
            </Popover>
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
