import React from 'react';
import Slider from 'react-slick';
import banner1 from '../../../assets/img/banner/banner-1.jpg';
import banner2 from '../../../assets/img/banner/banner-2.jpg';
import banner3 from '../../../assets/img/banner/banner-3.jpg';
export default function BannerHomePage() {
    const bannerArr = [
        {
            hinhAnh: banner1,
        },
        {
            hinhAnh: banner2,
        },
        {
            hinhAnh: banner3,
        },
    ];

    const SliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
    };

    const renderCarouselSlider = () => {
        return bannerArr.map((item, index) => {
            return (
                <div key={index} className="w-full">
                    <img className="lg:w-full" src={item.hinhAnh} />
                </div>
            );
        });
    };

    return (
        <div className="relative hidden md:block">
            <Slider
                {...SliderSettings}
                className="w-full banner-slider-container lg:mt-2"
            >
                {renderCarouselSlider()}
            </Slider>
            <div className="absolute flex flex-wrap items-center w-full bg-black/50 lg:bottom-8 lg:mb-2 lg:p-2 bottom-3 md:bottom-8">
                <h1 className="w-8/12 mx-auto my-auto text-xs text-center text-white lg:text-4xl lg:w-11/12 md:w-10/12 md:text-lg">
                    KHÁCH SẠN, KHU NGHỈ DƯỠNG, NHÀ TRỌ VÀ HƠN THẾ NỮA
                </h1>
                <h2 className="w-full mx-auto my-auto text-xs font-thin text-center text-white lg:text-xl lg:w-11/12 md:text-sm">
                    Nhận giá tốt nhất cho hơn 10.000 chỗ nghỉ toàn Việt Nam
                </h2>
            </div>
        </div>
    );
}
