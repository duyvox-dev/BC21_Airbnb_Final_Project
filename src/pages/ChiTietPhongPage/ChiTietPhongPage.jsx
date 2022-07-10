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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { convertLocaleString } from "../../utils/stringFormatUtils";
import RoomFeatureList from "./RoomFeature/RoomFeatureList";
import RangeDatePicker from "./RangeDatePicker/RangeDatePicker";
import Bed from "../../assets/img/room-convenience/bed.png";
import CommentContainer from "./Comment/CommentContainer";
import CommentModal from "./Comment/CommentModal";
import ModalDirect from "./ModalDirect";
import ChooseCustomer from "../../components/ChooseCustomer/ChooseCustomer";
import RoomInfo from "./RoomInfo/RoomInfo";
import BookTicket from "./BookTicket/BookTicket";
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
    const [modalDirectDetail, setModalDirectDetail] =
        useState(modalDetailLogin);
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
        // console.log(bookingTime);
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

    const toggleModal = () => {
        setIsModalCommentOpen(!isModalCommentOpen);
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
                                        {thongTinChiTietPhong?.locationId?.name}{" "}
                                        -{" "}
                                        {
                                            thongTinChiTietPhong?.locationId
                                                ?.province
                                        }
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
                            className="h-96 w-full rounded-3xl"
                        />
                        <img
                            src={thongTinChiTietPhong.image}
                            alt=""
                            className="h-96 w-full rounded-3xl"
                        />
                    </div>

                    <div className="flex w-full gap-[100px] pt-5">
                        <div className="w-[70%]">
                            <RoomInfo
                                thongTinChiTietPhong={thongTinChiTietPhong}
                            />
                        </div>
                        {/* Booking */}
                        <div className="w-[30%] relative">
                            <div className="sticky top-1">
                                <BookTicket
                                    thongTinChiTietPhong={thongTinChiTietPhong}
                                    scrollTo={scrollTo}
                                    commentListSize={danhSachDanhGia.length}
                                />
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
