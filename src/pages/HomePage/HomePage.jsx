import React, { useEffect } from "react";
import Slider from "react-slick";
import { Tabs, Card, Rate } from "antd";
import styles from "../css/HomePage.css";
import viTriSlice, {
  layDanhSachViTri,
  layDanhSachViTriDanhGiaCao,
} from "../../redux/viTriSlice";
import { useDispatch, useSelector } from "react-redux";
import { viTriService } from "../../services/viTriService";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faLocationDot,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { phongService } from "../../services/phongService";
import { layDanhSachPhong } from "../../redux/phongSlice";

const { TabPane } = Tabs;
const { Meta } = Card;

export default function HomePage() {
  let dispatch = useDispatch();

  useEffect(() => {
    async function fetchDanhSachViTriDanhGiaCao() {
      try {
        let result = await viTriService.layDanhSachViTriTheoDanhGia(9);
        console.log(result.data);
        dispatch(layDanhSachViTriDanhGiaCao(result.data));
      } catch (error) {
        console.log(error);
      }
    }
    fetchDanhSachViTriDanhGiaCao();

    async function fetchDanhSachPhong() {
      try {
        let result = await phongService.layDanhSachPhong();
        console.log(result.data);
        dispatch(layDanhSachPhong(result.data));
      } catch (error) {
        console.log(error);
      }
    }
    fetchDanhSachPhong();
  }, []);

  const bannerArr = [
    {
      hinhAnh: "../img/banner-1.jpg",
    },
    {
      hinhAnh: "../img/banner-2.jpg",
    },
    {
      hinhAnh: "../img/banner-3.jpg",
    },
  ];

  const tienIchIconArr = [
    {
      hinhAnh: "../img/room-convenience/bath-tub.png",
      ten: "Bồn tắm nước nóng",
    },
    {
      hinhAnh: "../img/room-convenience/bonfire.png",
      ten: "Đốt lửa trại",
    },
    {
      hinhAnh: "../img/room-convenience/chef.png",
      ten: "Nhà bếp",
    },
    {
      hinhAnh: "../img/room-convenience/hair-dryer.png",
      ten: "Máy sấy tóc",
    },
    {
      hinhAnh: "../img/room-convenience/heater.png",
      ten: "Lò sưởi ấm",
    },
    {
      hinhAnh: "../img/room-convenience/lift-sign.png",
      ten: "Thang máy",
    },
    {
      hinhAnh: "../img/room-convenience/stationary-bike.png",
      ten: "Khu tập gym",
    },
    {
      hinhAnh: "../img/room-convenience/swimming-pool.png",
      ten: "Hồ bơi",
    },
    {
      hinhAnh: "../img/room-convenience/watch-tv.png",
      ten: "Tivi truyền hình cáp",
    },
    {
      hinhAnh: "../img/room-convenience/wifi.png",
      ten: "Free Wifi",
    },
  ];

  const BannerCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const DiemDenThuHutSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };

  const renderCarouselSlider = () => {
    return bannerArr.map((item, index) => {
      return (
        <div key={index} className="w-full">
          <img className="w-full" src={item.hinhAnh} />
        </div>
      );
    });
  };

  let { danhSachViTriDanhGiaCao } = useSelector((state) => state.viTriSlice);

  const renderDiemDenThuHut = () => {
    return _.uniqBy(danhSachViTriDanhGiaCao, "province").map((viTri, index) => {
      return (
        <Link
          to={"/"}
          key={index}
          className="text-inherit hover:text-inherit group"
        >
          <div>
            <img
              className="w-28 h-28 mx-auto rounded-full my-2 group-hover:scale-110"
              src={viTri.image}
            />
            <p className="text-base font-bold text-center mx-auto my-auto">
              {viTri.province}
            </p>
            <p className="text-sm text-center mx-auto my-auto">1,000 chỗ ở</p>
          </div>
        </Link>
      );
    });
  };

  const customSlider = React.createRef();

  const goToNext = () => {
    customSlider.current.slickNext();
  };

  const goToPrevious = () => {
    customSlider.current.slickPrev();
  };

  const renderTienIchPhong = () => {
    return tienIchIconArr.map((item, index) => {
      return (
        <Link
          key={index}
          to={"/"}
          className="text-inherit hover:text-inherit group"
        >
          <div className="w-32">
            <img
              className="w-8 h-8 mx-auto my-2 group-hover:scale-110"
              src={item.hinhAnh}
            />
            <p className="text-sm font-bold text-center mx-auto my-auto">
              {item.ten}
            </p>
          </div>
        </Link>
      );
    });
  };

  let { danhSachPhong } = useSelector((state) => state.phongSlice);

  let deXuatDanhSachPhongDaNang = danhSachPhong.filter(
    (item) => item.locationId?.province == "Đà Nẵng"
  );

  const DeXuanPhongSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const renderDeXuatPhongDaNang = () => {
    return deXuatDanhSachPhongDaNang.map((phong, index) => {
      let diemDanhGia = phong.locationId?.valueate / 2;
      console.log(diemDanhGia);

      return (
        <div
          key={index}
          className="w-36 px-2 hover:shadow-xl p-5 cursor-pointer relative"
        >
          <img
            className="w-full mx-auto rounded-xl"
            alt={phong.name}
            src={phong.image}
          />
          <p className="w-8 h-8 leading-8 rounded-md bg-rose-500 text-white text-lg text-center absolute top-8 right-5">
            {phong.locationId?.valueate}
          </p>
          <h3 className="w-full text-xl font-bold text-center mt-2">
            {phong.name}
          </h3>
          <div className="w-full flex justify-end">
            <span className="my-auto">
              <Rate allowHalf disabled defaultValue={diemDanhGia} />
            </span>
            <span className="ml-3 text-blue-500 my-auto">
              <FontAwesomeIcon icon={faLocationDot} /> {phong.locationId?.name}
            </span>
          </div>
          <div className="w-full">
            <p className="text-right w-full my-auto italic">
              Giá rẻ nhất mỗi đêm từ
            </p>
            <p className="w-full my-auto text-lg text-rose-600 text-right">
              {phong.price.toLocaleString()} VND
            </p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="homepage w-full">
      <div className="relative">
        <Slider
          {...BannerCarouselSettings}
          className="banner-slider-container w-full mt-2"
        >
          {renderCarouselSlider()}
        </Slider>
        <div className="w-full absolute bottom-8 flex flex-wrap items-center mb-2 p-2 bg-black/50">
          <h1 className="text-4xl text-white w-11/12 mx-auto my-auto text-center">
            KHÁCH SẠN, KHU NGHỈ DƯỠNG, NHÀ TRỌ & HƠN THẾ NỮA
          </h1>
          <h2 className="text-xl text-white w-11/12 mx-auto my-auto text-center">
            Nhận giá tốt nhất cho hơn 10.000 chỗ nghỉ toàn Việt Nam
          </h2>
        </div>
      </div>
      <div className="w-11/12 mx-auto">
        <div className="w-full mt-5 pb-5 relative">
          <h1 className="w-11/12 mx-auto text-2xl text-center">
            Các điểm đến thu hút nhất Việt Nam
          </h1>
          <Slider
            ref={customSlider}
            {...DiemDenThuHutSliderSettings}
            className="w-9/12 mx-auto"
          >
            {renderDiemDenThuHut()}
          </Slider>
          <button
            className="absolute left-40 top-1/2 text-2xl text-gray-500"
            onClick={() => {
              goToPrevious();
            }}
          >
            <FontAwesomeIcon icon={faChevronCircleLeft} />
          </button>
          <button
            className="absolute right-40 top-1/2 text-2xl text-gray-500"
            onClick={() => {
              goToNext();
            }}
          >
            <FontAwesomeIcon icon={faChevronCircleRight} />
          </button>
        </div>
        <div className="w-full mt-10 pb-5">
          <h1 className="w-11/12 mx-auto text-2xl text-center">
            Các loại hình tiện ích bạn cần
          </h1>
          <div className="w-11/12 mx-auto flex justify-between items-center">
            {renderTienIchPhong()}
          </div>
        </div>
        <div className="w-full mt-10 pb-5">
          <h1 className="w-11/12 mx-auto text-2xl text-center">
            Những chỗ nghỉ nổi bật khuyến nghị cho bạn
          </h1>
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Hồ Chí Minh" key="1">
              <div className="relative">
                <Slider
                  ref={customSlider}
                  {...DeXuanPhongSliderSettings}
                  className="w-full"
                >
                  {renderDeXuatPhongDaNang()}
                </Slider>
                <button
                  className="absolute left-0 top-1/3 text-2xl text-gray-500"
                  onClick={() => {
                    goToPrevious();
                  }}
                >
                  <FontAwesomeIcon icon={faChevronCircleLeft} />
                </button>
                <button
                  className="absolute right-0 top-1/3 text-2xl text-gray-500"
                  onClick={() => {
                    goToNext();
                  }}
                >
                  <FontAwesomeIcon icon={faChevronCircleRight} />
                </button>
              </div>
            </TabPane>
            <TabPane tab="Hà Nội" key="2">
              <Slider
                ref={customSlider}
                {...DeXuanPhongSliderSettings}
                className="w-full"
              ></Slider>
            </TabPane>
            <TabPane tab="Đà Nẵng" key="3">
              <Slider
                ref={customSlider}
                {...DeXuanPhongSliderSettings}
                className="w-full"
              ></Slider>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
