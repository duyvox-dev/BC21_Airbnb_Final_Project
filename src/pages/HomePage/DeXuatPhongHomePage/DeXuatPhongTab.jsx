import { faChevronCircleLeft, faChevronCircleRight, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Rate } from 'antd';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import useWindowDimensions from '../../../HOOK/useWindowDimensions';

export default function DeXuatPhongTab(props) {

    let { deXuatDanhSachPhongTab } = props;

    const customSlider = React.createRef();

    const goToNext = () => {
        customSlider.current.slickNext();
    };

    const goToPrevious = () => {
        customSlider.current.slickPrev();
    };

    //Kiểm tra kích cỡ màn hình
    let checkScreenDimension = useWindowDimensions();
    //Quy định số lượng room card xuất hiện tuỳ theo kích cỡ màn hình
    let [currentScreenDimesion, setCurrentScreenDimesion] = useState(1);
    useEffect(() => { //Set lại giá trị currentScreenDimesion mỗi khi resize kích cỡ màn hình
        if (checkScreenDimension.width > 1024) {
            setCurrentScreenDimesion(4);
        };
        if (checkScreenDimension.width > 768 && checkScreenDimension.width <= 1024) {
            setCurrentScreenDimesion(3)
        };
        if (checkScreenDimension.width > 640 && checkScreenDimension.width <= 768) {
            setCurrentScreenDimesion(2)
        };
        if (checkScreenDimension.width > 320 && checkScreenDimension.width <= 640) {
            setCurrentScreenDimesion(1)
        };
    }, [checkScreenDimension]);

    const SliderSettings = {
        dots: false,
        infinite: deXuatDanhSachPhongTab > currentScreenDimesion ? true : false,
        speed: 500,
        slidesToShow: currentScreenDimesion,
        slidesToScroll: 1,
    };

    const renderDeXuatPhongTab = () => {
        return deXuatDanhSachPhongTab.map((phong, index) => {

            let diemDanhGia = phong.locationId?.valueate / 2;

            return <Link
                to={`/rooms/${phong._id}`}
                key={index}
                className='w-full cursor-pointer relative'
            >
                <div className='rounded-lg hover:shadow-xl duration-300 h-fit mx-2 shadow-md overflow-hidden border border-gray-200
                md:w-11/12 md:mx-auto md:shadow-md md:overflow-hidden md:my-2 md:border md:border-gray-200 
                lg:w-11/12 lg:my-2 lg:mx-auto lg:overflow-hidden lg:border lg:border-gray-200'>
                    <img className="w-full" alt={phong.name} src={phong.image} />
                    <p
                        className="
                    bg-rose-500 text-white text-center absolute rounded-full
                    lg:w-8 lg:h-8 lg:leading-8 lg:text-lg lg:top-5 lg:right-7
                    md:w-8 md:h-8 md:leading-8 md:text-lg md:top-5 md:right-8
                    w-6 h-6 leading-6 text-base top-3 right-5"
                    >
                        {phong.locationId?.valueate}
                    </p>
                    <h3
                        className="font-bold text-center w-full text-xl mt-2 px-2 h-14">
                        {phong.name}
                    </h3>
                    <div
                        className="flex w-11/12 mx-auto justify-center flex-wrap"
                    >
                        <span className="w-full my-auto text-xs text-center">
                            <Rate allowHalf disabled defaultValue={diemDanhGia} />
                        </span>
                        <span
                            className='text-blue-500 text-xs w-full text-center my-2'>
                            <FontAwesomeIcon icon={faLocationDot} /> {phong.locationId?.name}
                        </span>
                    </div>
                    <div className='w-full h-fit flex justify-end'>
                        <div className="w-11/12 mx-auto">
                            <p
                                className="my-auto italic w-full text-center"
                            >Giá rẻ nhất mỗi đêm từ
                            </p>
                            <p
                                className="text-rose-600 w-full my-auto font-bold text-lg text-center"
                            >{phong.price?.toLocaleString()} VND
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        });
    };

    return (
        <div className="relative">
            {
                deXuatDanhSachPhongTab.length > 0 && <Fragment>
                    <Slider
                        ref={customSlider}
                        {...SliderSettings}
                        className='w-full p-3'
                    >
                        {renderDeXuatPhongTab()}
                    </Slider>
                    <button
                        className="absolute text-rose-600
                        lg:left-0 lg:top-1/3 lg:text-3xl
                        md:left-0 md:top-1/2 md:text-3xl
                        left-0 top-1/2 text-3xl"
                        onClick={() => { goToPrevious() }}
                    >
                        <FontAwesomeIcon
                            icon={faChevronCircleLeft}
                        />
                    </button>
                    <button
                        className="absolute text-rose-600
                        lg:right-0 lg:top-1/3 lg:text-3xl
                        md:right-0 md:top-1/2 md:text-3xl
                        right-0 top-1/2 text-3xl"
                        onClick={() => { goToNext() }}
                    >
                        <FontAwesomeIcon
                            icon={faChevronCircleRight}
                        />
                    </button>
                </Fragment>
            }
        </div>
    )
}
