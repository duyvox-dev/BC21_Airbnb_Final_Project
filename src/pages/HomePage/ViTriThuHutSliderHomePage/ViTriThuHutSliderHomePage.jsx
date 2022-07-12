import React, { Fragment } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

export default function ViTriThuHutSliderHomePage(props) {

    let { danhSachViTriDanhGiaCao } = props;

    const customSlider = React.createRef();

    const goToNext = () => {
        customSlider.current.slickNext();
    };

    const goToPrevious = () => {
        customSlider.current.slickPrev();
    };

    const SliderSettings = {
        dots: false,
        infinite: danhSachViTriDanhGiaCao.length > 6 ? true : false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
    };

    const renderDiemDenThuHut = () => {
        return _.uniqBy(danhSachViTriDanhGiaCao, 'province').map((viTri, index) => {
            return <Link
                key={index}
                to={`/search/${viTri._id}`}
                className='text-inherit hover:text-inherit group'
            >
                <div key={index}>
                    <img className="md:w-20 md:h-20 xs:w-10 xs:h-10 lg:w-28 lg:h-28 lg:my-2 mx-auto rounded-full group-hover:scale-110" src={viTri.image} />
                    <p className="md:text-sm xs:text-xs lg:text-base font-bold text-center mx-auto my-auto">{viTri.province}</p>
                    <p className="xs:text-transparent md:text-xs lg:text-sm italic text-center mx-auto my-auto">1,000 chỗ ở</p>
                </div>
            </Link>
        })
    };

    return (
        <div className="w-full lg:mt-5 lg:pb-5 relative">
            <h1 className="lg:w-11/12 mx-auto lg:text-2xl md:text-2xl xs:text-base text-center">Các điểm đến thu hút nhất Việt Nam</h1>
            {
                danhSachViTriDanhGiaCao.length > 0 && <Fragment>
                    <Slider
                        ref={customSlider}
                        {...SliderSettings}
                        className='lg:w-9/12 mx-auto'
                    >
                        {renderDiemDenThuHut()}
                    </Slider>
                </Fragment>
            }
            <button
                className="absolute xs:top-10 xs:left-0 md:top-1/2 md:left-0 lg:left-40 lg:top-1/2 lg:text-2xl text-gray-500"
                onClick={() => { goToPrevious() }}
            >
                <FontAwesomeIcon
                    icon={faChevronCircleLeft}
                />
            </button>
            <button
                className="absolute xs:top-10 xs:right-0 md:top-1/2 md:right-0 lg:right-40 lg:top-1/2 lg:text-2xl text-gray-500"
                onClick={() => { goToNext() }}
            >
                <FontAwesomeIcon
                    icon={faChevronCircleRight}
                />
            </button>
        </div>
    )
}
