import React from "react";
import CommentList from "./CommentList";
import { useDispatch, useSelector } from "react-redux";
import { setCommentModal } from "../../../redux/chiTietPhongSlice";
export default function CommentContainer() {
    const { danhSachDanhGia } = useSelector((state) => state.danhGiaSlice);
    const dispatch = useDispatch();

    const toggleModal = () => {
        dispatch(setCommentModal(true));
    };
    const LIMIT = 4;
    return (
        <div>
            <CommentList limit={LIMIT}></CommentList>
            <div className="mt-5">
                {danhSachDanhGia.length > LIMIT - 1 && (
                    <button
                        className="text-lg font-semibold  py-2 px-5 border border-slate-600 hover:border-slate-900 rounded-md"
                        onClick={toggleModal}
                    >
                        Xem toàn bộ đánh giá
                    </button>
                )}
            </div>
        </div>
    );
}
