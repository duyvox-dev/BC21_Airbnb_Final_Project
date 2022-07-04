import React from "react";
import userImg from "../../../assets/img/user_default.png";
import moment from "moment";
import { truncate } from "../../../utils/stringFormatUtils";
export default function ({ data, toggleModal = () => {}, needTruncate }) {
    const STRING_LIMIT_LENGTH = 150;
    return (
        <div className="pr-10">
            <div className="flex gap-5">
                <div className="w-[50px] h-[50px] cursor-pointer rounded-full">
                    <img src={userImg} alt="" className="w-full h-full" />
                </div>
                <div>
                    <h4 className="font-semibold text-lg m-0 p-0">Leo</h4>
                    <span className="text-gray-500">
                        {moment(data.created_at).format("YYYY-MM-DD")}
                    </span>
                </div>
            </div>
            <div className="mt-5 text-lg">
                <span>
                    {needTruncate
                        ? truncate(data.content, STRING_LIMIT_LENGTH)
                        : data.content}
                </span>
                {data.content.length > STRING_LIMIT_LENGTH && needTruncate && (
                    <span
                        className="underline font-semibold ml-3 cursor-pointer"
                        onClick={toggleModal}
                    >
                        Xem thêm
                    </span>
                )}
            </div>
        </div>
    );
}
