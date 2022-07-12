import React from 'react';
import { Link } from 'react-router-dom';

export default function LoaiHinhTienIchSliderHomePage(props) {

    const tienIchIconArr = [
        {
            hinhAnh: '../img/room-convenience/bath-tub.png',
            ten: 'Bồn tắm nước nóng',
        },
        {
            hinhAnh: '../img/room-convenience/bonfire.png',
            ten: 'Đốt lửa trại',
        },
        {
            hinhAnh: '../img/room-convenience/chef.png',
            ten: 'Nhà bếp',
        },
        {
            hinhAnh: '../img/room-convenience/hair-dryer.png',
            ten: 'Máy sấy tóc',
        },
        {
            hinhAnh: '../img/room-convenience/heater.png',
            ten: 'Lò sưởi ấm',
        },
        {
            hinhAnh: '../img/room-convenience/lift-sign.png',
            ten: 'Thang máy',
        },
        {
            hinhAnh: '../img/room-convenience/stationary-bike.png',
            ten: 'Khu tập gym',
        },
        {
            hinhAnh: '../img/room-convenience/swimming-pool.png',
            ten: 'Hồ bơi',
        },
        {
            hinhAnh: '../img/room-convenience/watch-tv.png',
            ten: 'Tivi truyền hình cáp',
        },
        {
            hinhAnh: '../img/room-convenience/wifi.png',
            ten: 'Free Wifi',
        },
    ];

    const renderTienIchPhong = () => {
        return tienIchIconArr.map((item, index) => {
            return <Link
                key={index}
                to={'/'}
                className='text-inherit hover:text-inherit group'
            >
                <div className='lg:w-32 md:w-16 xs:w-16 xs:mb-2'>
                    <img className="xs:w-5 xs:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 lg:my-2 mx-auto group-hover:scale-110" src={item.hinhAnh} />
                    <p className="xs:text-xs xs:font-normal md:text-xs lg:text-sm font-bold text-center mx-auto my-auto">{item.ten}</p>
                </div>
            </Link>
        })
    };

    return (
        <div className="lg:w-full lg:mt-10 lg:pb-5 xs:-mt-6">
            <h1 className="lg:w-11/12 lg:text-2xl mx-auto text-center">Các loại hình tiện ích bạn cần</h1>
            <div className='lg:w-11/12 mx-auto flex justify-between items-start xs:grid xs:grid-cols-5'>
                {renderTienIchPhong()}
            </div>
        </div>
    )
}
