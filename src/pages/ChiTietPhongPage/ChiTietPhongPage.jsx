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

import CommentContainer from "./Comment/CommentContainer";
import CommentModal from "./Comment/CommentModal";
import ModalDirect from "./ModalDirect";
import RoomInfo from "./RoomInfo/RoomInfo";
import BookTicket from "./BookTicket/BookTicket";
import { animateScroll as scroll, scroller, Element } from "react-scroll";
import AuthModal from "../../components/Modal/AuthModal";
import { setBookingStatus } from "../../redux/bookingRoomSlice";
export default function ChiTietPhongPage() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { isBookedSuccess } = useSelector((state) => state.bookingRoomSlice);
    const { thongTinChiTietPhong } = useSelector((state) => state.phongSlice);
    const { danhSachDanhGia } = useSelector((state) => state.danhGiaSlice);
    const { id } = useParams();
    const [isModalCommentOpen, setIsModalCommentOpen] = useState(false);
    const [isModalAuthOpen, setIsModalAuthOpen] = useState(false);
    const [isModalDirectOpen, setIsModalDirectOpen] = useState(false);
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

    const toggleCommentModal = () => {
        setIsModalCommentOpen(!isModalCommentOpen);
    };
    const toggleAuthModal = () => {
        setIsModalAuthOpen(!isModalAuthOpen);
    };
    // useEffect(() =>{

    // },[access])
    useEffect(() => {
        if (isBookedSuccess) {
            setIsModalDirectOpen(true);
            dispatch(setBookingStatus(false));
        }
    }, [isBookedSuccess]);
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
        <div>
            <AuthModal
                isModalOpen={isModalAuthOpen}
                toggleModal={toggleAuthModal}
            />
            <ModalDirect
                isModalOpen={isModalDirectOpen}
                modalDetail={modalDirectDetail}
            />
            <CommentModal
                isModalOpen={isModalCommentOpen}
                toggleModal={toggleCommentModal}
            />
            <div className="w-11/12 mx-auto py-10 px-2 ">
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

                    <div className="flex w-full sm:flex-col lg:flex-row gap-[100px] pt-5">
                        <div className="sm:w-full lg:w-[70%]">
                            <RoomInfo
                                thongTinChiTietPhong={thongTinChiTietPhong}
                            />
                        </div>
                        {/* Booking */}
                        <div className="sm:w-full lg:w-[30%] relative">
                            <div className="sticky top-1">
                                <Element name="bookTicketContainer">
                                    {
                                        <BookTicket
                                            thongTinChiTietPhong={
                                                thongTinChiTietPhong
                                            }
                                            scrollTo={scrollTo}
                                            commentListSize={
                                                danhSachDanhGia.length
                                            }
                                            setModalAuthVisible={
                                                setIsModalAuthOpen
                                            }
                                        />
                                    }
                                </Element>
                                {/* <BookTicket
                                    thongTinChiTietPhong={thongTinChiTietPhong}
                                    scrollTo={scrollTo}
                                    commentListSize={danhSachDanhGia.length}
                                    setModalAuthVisible={setIsModalAuthOpen}
                                /> */}
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
                                {
                                    <CommentContainer
                                        toggleModal={toggleCommentModal}
                                    />
                                }
                            </Element>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
