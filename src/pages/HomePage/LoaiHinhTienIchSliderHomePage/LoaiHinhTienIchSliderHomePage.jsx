import React from "react";
import { Link } from "react-router-dom";
import gym from "../../../assets/img/room-convenience/gym.png";
import tv from "../../../assets/img/room-convenience/tv.png";
import bathTub from "../../../assets/img/room-convenience/bath-tub.png";
import bonfire from "../../../assets/img/room-convenience/bonfire.png";
import chef from "../../../assets/img/room-convenience/chef.png";
import elevator from "../../../assets/img/room-convenience/elevator.png";
import heater from "../../../assets/img/room-convenience/heater.png";
import pool from "../../../assets/img/room-convenience/pool.png";
import dryer from "../../../assets/img/room-convenience/dryer.png";
import wifi from "../../../assets/img/room-convenience/wifi.png";
export default function LoaiHinhTienIchSliderHomePage(props) {
    const tienIchIconArr = [
        {
            hinhAnh: bathTub,
            ten: "Bồn tắm nước nóng",
        },
        {
            hinhAnh: bonfire,
            ten: "Đốt lửa trại",
        },
        {
            hinhAnh: chef,
            ten: "Nhà bếp",
        },
        {
            hinhAnh: dryer,
            ten: "Máy sấy tóc",
        },
        {
            hinhAnh: heater,
            ten: "Lò sưởi ấm",
        },
        {
            hinhAnh: elevator,
            ten: "Thang máy",
        },
        {
            hinhAnh: gym,
            ten: "Khu tập gym",
        },
        {
            hinhAnh: pool,
            ten: "Hồ bơi",
        },
        {
            hinhAnh: tv,
            ten: "Tivi truyền hình cáp",
        },
        {
            hinhAnh: wifi,
            ten: "Free Wifi",
        },
    ];

    const renderTienIchPhong = () => {
        return tienIchIconArr.map((item, index) => {
            return (
                <Link
                    key={index}
                    to={"/"}
                    className="text-inherit hover:text-inherit group"
                >
                    <div
                        className="lg:w-28 lg:wb-0
                md:w-16 md:wb-0
                w-16 mb-2"
                    >
                        <img
                            className="w-5 h-5 
                    md:w-6 md:h-6 
                    lg:w-8 lg:h-8 lg:my-2 mx-auto group-hover:scale-110"
                            src={item.hinhAnh}
                        />
                        <p
                            className="text-xs font-normal text-center my-auto
                    md:text-xs 
                    lg:text-sm lg:font-bold"
                        >
                            {item.ten}
                        </p>
                    </div>
                </Link>
            );
        });
    };

    return (
        <div
            className="w-full -mt-6
        md:mt-0
        lg:mt-10 lg:pb-5"
        >
            <h2 className="text-2xl md:text-3xl font-bold text-center">
                Các loại hình tiện ích bạn cần
            </h2>
            <div
                className=" 
            w-full grid grid-cols-5
            md:w-11/12 md:mt-5 md:mx-auto md:flex md:justify-between md:items-start
            lg:w-11/12 lg:mx-auto lg:flex lg:justify-center lg:items-start"
            >
                {renderTienIchPhong()}
            </div>
        </div>
    );
}
