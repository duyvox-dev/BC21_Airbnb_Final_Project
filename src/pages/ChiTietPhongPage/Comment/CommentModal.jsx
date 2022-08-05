import React from "react";
import { Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import CommentItem from "./CommentItem";
import Modal from "../../../components/Modal/Modal";
import { setCommentModal } from "../../../redux/chiTietPhongSlice";
export default function CommentModal() {
    const { danhSachDanhGia } = useSelector((state) => state.danhGiaSlice);
    const dispatch = useDispatch();
    const { commentModal } = useSelector((state) => state.chiTietPhongSlice);
    const toggleModal = () => {
        dispatch(setCommentModal(false));
    };
    return (
        <Modal isOpen={commentModal} onClose={toggleModal}>
            <Dialog.Panel className="w-full md:max-w-[45rem] max-w-[25rem] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center p-5 border-b"
                >
                    Toàn bộ đánh giá
                </Dialog.Title>
                <div className="mt-2 h-[75vh] overflow-y-scroll">
                    <div className="px-5 grid md:grid-cols-1   lg:grid-cols-2 gap-10 py-5">
                        {danhSachDanhGia.length > 1 &&
                            danhSachDanhGia.map((danhGia, index) => {
                                // console.log(danhGia);
                                return (
                                    <CommentItem
                                        key={index}
                                        data={danhGia}
                                        needTruncate={false}
                                    ></CommentItem>
                                );
                            })}
                    </div>
                </div>

                <div className="py-4 px-5 border-t">
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 text-center text-white font-semibold text-lg block py-2 w-full rounded-md hover:bg-gradient-to-l  duration-300 ease-in-out"
                            onClick={toggleModal}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </Dialog.Panel>
        </Modal>
    );
}
