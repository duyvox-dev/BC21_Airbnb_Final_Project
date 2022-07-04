import React from "react";
import CommentItem from "./CommentItem";
export default function CommentList({ commentList }) {
    return (
        <div className="grid grid-cols-2 gap-10">
            <CommentItem></CommentItem>
            <CommentItem></CommentItem>
            <CommentItem></CommentItem>
            <CommentItem></CommentItem>
            <CommentItem></CommentItem>
        </div>
    );
}
