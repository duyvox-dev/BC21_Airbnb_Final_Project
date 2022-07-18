import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getRoomDetail } from "../../redux/phongSlice";
import { getDanhSachDanhGiaPhong } from "../../redux/danhGiaSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal, faStar } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer/Footer";
import CommentContainer from "./Comment/CommentContainer";
import CommentModal from "./Comment/CommentModal";
import ModalDirect from "./ModalDirect";
import RoomInfo from "./RoomInfo/RoomInfo";
import BookTicket from "./BookTicket/BookTicket";
import { animateScroll as scroll, scroller, Element } from "react-scroll";
import AuthModal from "../../components/Modal/AuthModal";
import { setBookingStatus } from "../../redux/bookingRoomSlice";
import BookTicketModal from "./BookTicket/BookTicketModal";
import { message } from "antd";
import { setCommentModal, setDirectModal } from "../../redux/chiTietPhongSlice";
export default function ChiTietPhongPage() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { isBookedSuccess } = useSelector((state) => state.bookingRoomSlice);
    const { bookTicketModal } = useSelector((state) => state.chiTietPhongSlice);
    const { thongTinChiTietPhong } = useSelector((state) => state.phongSlice);
    const { danhSachDanhGia } = useSelector((state) => state.danhGiaSlice);
    const { id } = useParams();

    const modalDetailSuccessBooking = {
        title: "Đặt vé thành công",
        message: "Chúc bạn có một kì nghỉ tuyệt vời.",
        actions: [{ type: "primary", path: "/", name: "Quay về trang chủ" }],
    };
    const [modalDirectDetail, setModalDirectDetail] = useState(
        modalDetailSuccessBooking
    );
    useEffect(() => {
        dispatch(getRoomDetail(id));
        dispatch(getDanhSachDanhGiaPhong(id));
    }, []);

    useEffect(() => {
        if (isBookedSuccess && !bookTicketModal) {
            message.success("Đặt vé thành công ");
            dispatch(setDirectModal(true));
            dispatch(setBookingStatus(false));
        }
    }, [bookTicketModal, isBookedSuccess]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
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
        <div className="relative">
            <ModalDirect modalDetail={modalDirectDetail} />
            <BookTicketModal />
            <AuthModal />
            <CommentModal />

            <div className="md:w-11/12 lg:container mx-auto py-10 px-5 ">
                <div className="">
                    {/* Room header */}
                    <div>
                        <h1 className=" font-bold text-2xl md:text-3xl flex gap-2 items-center">
                            <span> {thongTinChiTietPhong.name}</span>
                        </h1>
                        <div className="flex gap-2 items-center text-md md:text-lg">
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

                            <span className="underline text-black font-semibold cursor-pointer">
                                <span>
                                    {thongTinChiTietPhong?.locationId?.name} -{" "}
                                    {thongTinChiTietPhong?.locationId?.province}
                                </span>
                            </span>
                        </div>
                    </div>
                    {/* Room image */}
                    <div className=" h-96 my-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                        <img
                            src={thongTinChiTietPhong.image}
                            alt=""
                            className="h-96 w-full rounded-3xl"
                        />
                        <img
                            src={thongTinChiTietPhong.image}
                            alt=""
                            className="h-96 w-full rounded-3xl hidden md:block"
                        />
                    </div>

                    <div className="flex w-full flex-col lg:flex-row gap-[100px] pt-5">
                        <div className="w-full lg:w-[70%]">
                            <RoomInfo
                                thongTinChiTietPhong={thongTinChiTietPhong}
                            />
                        </div>
                        {/* Booking */}
                        <div className="sm:w-full lg:w-[30%] relative hidden lg:block">
                            <div className="sticky top-1 border border-slate-300 rounded-md">
                                <Element name="bookTicketContainer">
                                    {<BookTicket />}
                                </Element>
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
                                {<CommentContainer />}
                            </Element>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </div>
    );
}
