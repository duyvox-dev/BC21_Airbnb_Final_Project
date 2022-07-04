import React from "react";
import { useSelector } from "react-redux";
import CommentItem from "./CommentItem";
export default function CommentList({ limit = 0, toggleModal }) {
    const { danhSachDanhGia } = useSelector((state) => state.danhGiaSlice);
    const sortedCommentList = [...danhSachDanhGia];
    sortedCommentList.sort(function compare(a, b) {
        var dateA = new Date(a.created_at);
        var dateB = new Date(b.created_at);
        return dateB - dateA;
    });

    return (
        <div className="grid grid-cols-2 gap-10">
            {sortedCommentList.map((danhGia, index) => {
                if (index < limit)
                    return (
                        <CommentItem
                            key={index}
                            data={danhGia}
                            toggleModal={toggleModal}
                            needTruncate={true}
                        ></CommentItem>
                    );
            })}
            {/* <CommentItem></CommentItem>
            <CommentItem></CommentItem>
            <CommentItem></CommentItem>
            <CommentItem></CommentItem>
            <CommentItem></CommentItem> */}
        </div>
    );
}
