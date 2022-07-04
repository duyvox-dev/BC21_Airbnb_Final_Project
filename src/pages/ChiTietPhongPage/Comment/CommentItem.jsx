import React from "react";
import userImg from "../../../assets/img/user_default.png";
export default function () {
    return (
        <div className="pr-10">
            <div className="flex gap-5">
                <div className="w-[50px] h-[50px] cursor-pointer rounded-full">
                    <img src={userImg} alt="" className="w-full h-full" />
                </div>
                <div>
                    <h4 className="font-semibold text-lg m-0 p-0">Leo</h4>
                    <span className="text-gray-500">2022-07-15</span>
                </div>
            </div>
            <div className="mt-5 text-lg">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Mollitia alias odit explicabo molestiae? Sit amet tempora nobis
                optio aperiam fugit?
            </div>
        </div>
    );
}
