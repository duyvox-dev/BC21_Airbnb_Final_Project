import React from 'react';
import { Dialog } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import CommentItem from './CommentItem';
import Modal from '../../../components/Modal/Modal';
import { setCommentModal } from '../../../redux/chiTietPhongSlice';
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
                    className="p-5 text-lg font-medium leading-6 text-center text-gray-900 border-b"
                >
                    Toàn bộ đánh giá
                </Dialog.Title>
                <div className="mt-2 h-[75vh] overflow-y-scroll">
                    <div className="grid gap-10 px-5 py-5 md:grid-cols-1 lg:grid-cols-2">
                        {danhSachDanhGia.length > 1 &&
                            danhSachDanhGia.map((danhGia, index) => {
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

                <div className="px-5 py-4 border-t">
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="block w-full py-2 text-lg font-semibold text-center text-white duration-300 ease-in-out rounded-md bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 hover:bg-gradient-to-l"
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
