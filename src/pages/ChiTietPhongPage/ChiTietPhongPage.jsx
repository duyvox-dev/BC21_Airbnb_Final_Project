import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  bookRoom,
  getRoomDetail,
  resetBookingStatus,
} from "../../redux/phongSlice";
import { getDanhSachDanhGiaPhong } from "../../redux/danhGiaSlice";
import moment from "moment";
// import { FaStar, FaMedal, FaAirbnb, FaBed } from "react-icons/fa";
// import { BsTranslate } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal, faStar, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { convertLocaleString } from "../../utils/stringFormatUtils";
import RoomFeatureList from "./RoomFeature/RoomFeatureList";
import RangeDatePicker from "./RangeDatePicker/RangeDatePicker";
import Bed from "../../assets/img/room-convenience/bed.png";
import CommentContainer from "./Comment/CommentContainer";
import CommentModal from "./Comment/CommentModal";
import ModalDirect from "./ModalDirect";
import ChooseCustomer from "../../components/ChooseCustomer/ChooseCustomer";
import { animateScroll as scroll, scroller, Element } from "react-scroll";
export default function ChiTietPhongPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.authSlice);
  const { thongTinChiTietPhong } = useSelector((state) => state.phongSlice);
  const { danhSachDanhGia } = useSelector((state) => state.danhGiaSlice);
  const { isBookedSuccess } = useSelector((state) => state.phongSlice);
  const [roomFeatures, setRoomFeatures] = useState({});
  const { id } = useParams();
  const [isModalCommentOpen, setIsModalCommentOpen] = useState(false);
  const [isModalDirectOpen, setIsModalDirectOpen] = useState(false);

  const [customerQuantity, setCustomerQuantity] = useState(0);
  const [daysOfBooking, setDaysOfBooking] = useState(0);
  const [bookingTime, setBookingTime] = useState({
    checkIn: "",
    checkOut: "",
  });
  const modalDetailLogin = {
    title: "Vui lòng đăng nhập để đặt vé",
    message: "Để đặt vé cần đăng nhập tài khoản",
    actions: [
      { type: "normal", path: "/", name: "Quay về trang chủ" },
      {
        type: "primary",
        path: "/login",
        redirect: location.pathname,
        name: "Đăng nhập",
      },
    ],
  };
  const modalDetailSuccessBooking = {
    title: "Đặt vé thành công",
    message: "Chúc bạn có một kì nghỉ tuyệt vời.",
    actions: [
      { type: "normal", path: "/", name: "Quay về trang chủ" },
      { type: "primary", path: "/user", name: "Xem vé vừa đặt" },
    ],
  };
  const [modalDirectDetail, setModalDirectDetail] = useState(modalDetailLogin);
  const [ableToBook, setAbleToBook] = useState(false);
  useEffect(() => {
    dispatch(getRoomDetail(id));
    dispatch(getDanhSachDanhGiaPhong(id));
  }, []);
  useEffect(() => {
    const features = {
      cableTV: thongTinChiTietPhong?.cableTV,
      dryer: thongTinChiTietPhong?.dryer,
      elevator: thongTinChiTietPhong?.elevator,
      gym: thongTinChiTietPhong?.gym,
      heating: thongTinChiTietPhong?.heating,
      hotTub: thongTinChiTietPhong?.hotTub,
      indoorFireplace: thongTinChiTietPhong?.indoorFireplace,
      kitchen: thongTinChiTietPhong?.kitchen,
      pool: thongTinChiTietPhong?.pool,
      wifi: thongTinChiTietPhong?.wifi,
    };
    setRoomFeatures({ ...features });
  }, [thongTinChiTietPhong]);

  const onDatePickerChange = (key, data) => {
    setBookingTime({
      checkIn: moment(data[0]).format(),
      checkOut: moment(data[1]).format(),
    });
  };
  useEffect(() => {
    const temp =
      moment(bookingTime.checkOut).diff(bookingTime.checkIn, "days") + 1;
    if (temp) setDaysOfBooking(temp);
    console.log(bookingTime);
  }, [bookingTime]);

  useEffect(() => {
    if (
      bookingTime.checkIn == "Invalid date" ||
      bookingTime.checkOut == "Invalid date" ||
      customerQuantity == 0
    )
      setAbleToBook(false);
    else setAbleToBook(true);
  }, [customerQuantity, bookingTime]);
  useEffect(() => {
    if (!accessToken) {
      setModalDirectDetail(modalDetailLogin);
      setIsModalDirectOpen(true);
    }
  }, [accessToken]);
  useEffect(() => {
    if (isBookedSuccess) {
      setModalDirectDetail(modalDetailSuccessBooking);
      setIsModalDirectOpen(true);
    }
  }, [isBookedSuccess]);
  useEffect(() => {
    return () => {
      dispatch(resetBookingStatus());
    };
  }, []);
  const handleBooking = () => {
    const bookingData = {
      roomId: id,
      ...bookingTime,
    };
    // console.log(bookingData);
    dispatch(bookRoom(bookingData));
  };
  const handleChooseCustomer = (totalCustomers, customerList) => {
    setCustomerQuantity(totalCustomers);
    console.log(totalCustomers, customerList);
  };
  const renderBedRoom = () => {
    const components = [];
    for (let i = 0; i < thongTinChiTietPhong.bedRoom; i++)
      components.push(<img src={Bed} className="w-[30px] h-[30px]" />);
    return components;
  };
  const toggleModal = () => {
    setIsModalCommentOpen(!isModalCommentOpen);
  };
  const countTotalCost = () => {
    return daysOfBooking * thongTinChiTietPhong.price;
  };
  const scrollTo = (element) => {
    scroller.scrollTo(element, {
      duration: 1500,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -100,
    });
  };
  document.title = `${thongTinChiTietPhong.name} - Airbnb`;
  return (
    <div>
      <ModalDirect
        isModalOpen={isModalDirectOpen}
        modalDetail={modalDirectDetail}
      />
      <CommentModal
        isModalOpen={isModalCommentOpen}
        toggleModal={toggleModal}
      />
      <div className="container mx-auto py-10 px-2 ">
        <div>
          {/* Room header */}
          <div>
            <h1 className=" font-bold text-3xl flex gap-2 items-center">
              <span> {thongTinChiTietPhong.name}</span>
            </h1>
            <div className="flex gap-2 items-center text-lg">
              <span className="flex gap-2 items-center">
                <FontAwesomeIcon className="" icon={faStar} />
                <span className=" font-semibold">4.83</span>
              </span>
              <span className="text-slate-500">.</span>
              <span
                className="flex gap-2 items-center"
                onClick={() => {
                  scrollTo("commentContainer");
                }}
              >
                <FontAwesomeIcon className="" icon={faMedal} />
                <span className=" underline  font-semibold cursor-pointer">
                  {danhSachDanhGia.length} đánh giá
                </span>
              </span>
              <span className="text-slate-500">.</span>
              <Link to="/search/">
                <span className="underline text-black font-semibold">
                  <span>
                    {thongTinChiTietPhong?.locationId?.name} -{" "}
                    {thongTinChiTietPhong?.locationId?.province}
                  </span>
                </span>
              </Link>
            </div>
          </div>
          {/* Room image */}
          <div className=" h-96 my-5 grid grid-cols-2 gap-5">
            <img
              src={thongTinChiTietPhong.image}
              alt=""
              className="h-full w-full rounded-3xl"
            />
            <img
              src={thongTinChiTietPhong.image}
              alt=""
              className="h-full w-full rounded-3xl"
            />
          </div>
          {/* Room Info */}
          <div className="flex w-full gap-[100px] pt-5">
            <div className="w-[70%]">
              {/* Room owner */}
              <div className="flex justify-between items-center py-5 border-b-[2px] border-slate-200">
                <div>
                  <h2 className="text-2xl font-semibold">
                    Căn hộ {thongTinChiTietPhong.name} . Chủ nhà: XYZ
                  </h2>
                  <p className="flex gap-2">
                    <span>{thongTinChiTietPhong.guests} khách</span>
                    <span className="text-slate-500">.</span>

                    <span>{thongTinChiTietPhong.bedRoom} phòng ngủ</span>
                    <span className="text-slate-500">.</span>

                    <span>{thongTinChiTietPhong.bath} phòng tắm</span>
                  </p>
                </div>
                <div className="cursor-pointer relative">
                  <img
                    src={thongTinChiTietPhong.image}
                    alt=""
                    className="rounded-full w-[70px] h-[70px]"
                  />
                  <span className="absolute -right-1 -bottom-[10px] bg-white w-[40px] h-[40px] flex justify-center items-center rounded-full border-[1px] border-slate-400 text-xl text-yellow-500">
                    <FontAwesomeIcon className="" icon={faMedal} />
                  </span>
                </div>
              </div>

              {/* hardcode Chu nha sieu cap */}
              <div className="py-5 border-b-[2px] border-slate-200">
                <div className="flex gap-5 items-center">
                  <div className=" text-xl">
                    <FontAwesomeIcon className="" icon={faMedal} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-0">
                      XYZ là Chủ nhà siêu cấp
                    </h4>
                    <span className=" text-gray-500">
                      Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được
                      đánh giá cao và là những người cam kết mang lại quãng thời
                      gian ở tuyệt vời cho khách.
                    </span>
                  </div>
                </div>
              </div>
              {/* Bed*/}
              <div className="py-5 border-b-[2px] border-slate-200">
                <h4 className="text-2xl font-semibold mb-0">
                  Nơi bạn sẽ nghỉ ngơi
                </h4>
                <div className="mt-5 grid grid-cols-4">
                  <div className="p-10 border-slate-300 border rounded-md inline-block text-lg">
                    <div className=" flex gap-5 justify-center">
                      {renderBedRoom()}
                    </div>
                    <span className=" block mt-2 font-semibold text-center">
                      {thongTinChiTietPhong.bedRoom} phòng ngủ
                    </span>
                  </div>
                </div>
              </div>
              {/* Description */}
              <div className="py-5 border-b-[2px] border-slate-200">
                <div className="py-3 px-5 border-[1px] border-slate-700 flex items-center justify-between text-lg rounded cursor-pointer">
                  <span>Dịch sang tiếng việt</span>
                  <span>
                    <FontAwesomeIcon className="" icon={faLanguage} />
                  </span>
                </div>
                <p className="text-lg mt-5 mb-0">
                  {thongTinChiTietPhong.description}
                </p>
              </div>
              {/* Room Features */}
              <div className="py-5 border-b-[2px] border-slate-200">
                <h2 className="text-2xl font-semibold">
                  Nơi này có những gì cho bạn
                </h2>
                <div>
                  <RoomFeatureList featureList={roomFeatures} />
                </div>
              </div>
            </div>
            {/* Booking */}
            <div className="w-[30%] relative">
              <div className="border border-slate-300 rounded-md p-5 shadow sticky top-1">
                <div className="flex justify-between items-center">
                  <span className="flex gap-2 items-center">
                    <span className="font-semibold text-xl">
                      đ {convertLocaleString(thongTinChiTietPhong.price)}
                    </span>
                    <span>/ đêm</span>
                  </span>
                  <span className="flex gap-2 items-center">
                    <FontAwesomeIcon className="" icon={faMedal} />
                    <span
                      className=" underline  font-semibold cursor-pointer text-slate-500"
                      onClick={() => {
                        scrollTo("commentContainer");
                      }}
                    >
                      {danhSachDanhGia.length} đánh giá
                    </span>
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
                        đ {convertLocaleString(thongTinChiTietPhong.price)} x{" "}
                        {daysOfBooking} đêm
                      </span>
                    </span>
                    <span> đ {countTotalCost()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Comment */}
          <div className="comment py-5">
            <h2 className="text-2xl font-semibold">
              <span>
                <span>Có </span>
                {danhSachDanhGia.length}
                <span> đánh giá</span>
              </span>
            </h2>
            <div className="">
              <Element name="commentContainer" className="py-10">
                {<CommentContainer toggleModal={toggleModal} />}
              </Element>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
