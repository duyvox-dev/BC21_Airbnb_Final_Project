import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import xacMinhDanhTinhIcon from "../../assets/img/security.png";
import { faCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormChinhSuaHoSo from "./FormChinhSuaHoSo/FormChinhSuaHoSo";
import { useParams } from "react-router-dom";
import {
    getThongTinNguoiDung,
    hienThiFormChinhSuaHoSo,
    selectFormChinhSuaHoSoOpen,
    selectThongTinNguoiDung,
    uploadAnhNguoiDung,
} from "../../redux/nguoiDungSlice";
import { useFormik } from "formik";
import user_default from "../../assets/img/user_default.png";
export default function ThongTinCaNhanPage(props) {
    let { id } = useParams();

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getThongTinNguoiDung(id));
    }, []);

    let thongTinNguoiDung = useSelector(selectThongTinNguoiDung);
    let formChinhSuaHoSoOpen = useSelector(selectFormChinhSuaHoSoOpen);

    const [loading, setLoading] = useState(false);
    const [imgUrl, setImgUrl] = useState(user_default);

    const handleHienThiChinhSuaThongTin = () => {
        dispatch(hienThiFormChinhSuaHoSo());
        window.scrollTo(0, 240);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            avatar: null,
        },
        onSubmit: (values) => {
            //Tạo form data để gửi dữ liệu về backend
            let formData = new FormData();
            formData.append("avatar", values.avatar);

            //Gọi API gửi dữ liệu về backend
            dispatch(uploadAnhNguoiDung(formData));
            setTimeout(() => {
                //Ẩn nút xác nhận upload ảnh
                setLoading(false);
            }, 500);
        },
    });

    const handleUploadAvatar = (e) => {
        //Lấy file từ event
        let file = e.target.files[0];
        formik.setFieldValue("avatar", file);

        //Tạo đối tượng đọc file
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            let image = e.target.result;
            setImgUrl(image);
        };
        //Hiển thị nút xác nhận upload ảnh
        setLoading(true);
    };

    document.title = `${thongTinNguoiDung.name} - Airbnb`;

    return (
        <div
            className="mx-auto pt-[120px] lg:w-10/12 lg:my-5 lg:grid lg:grid-cols-12
    md:w-11/12 md:my-5 md:grid md:grid-cols-12
    w-11/12 mt-5"
        >
            <div className="w-full lg:col-span-3 md:col-span-4">
                <div className="mx-auto bg-white lg:w-11/12 lg:p-5 lg:border lg:border-gray-300 lg:rounded-2xl md:w-11/12 md:p-5 md:border md:border-gray-300 md:rounded-2xl">
                    <div className="mx-auto lg:w-11/12 md:w-11/12">
                        <img
                            src={imgUrl ? imgUrl : thongTinNguoiDung.avatar} //Hiển thị ảnh upload mới thay cho ảnh cũ
                            alt="avatar"
                            className="w-40 h-40 mx-auto rounded-full lg:w-36 lg:h-36 md:w-36 md:h-36"
                        />
                        <form
                            onSubmit={formik.handleSubmit}
                            className="flex flex-wrap justify-center w-full h-16 lg:h-14 lg:flex lg:flex-wrap lg:justify-center lg:my-2 lg:relative md:h-14 md:flex md:flex-wrap md:justify-center md:my-2 md:relative"
                        >
                            <label
                                for="upload-photo"
                                className="w-full font-bold text-center underline cursor-pointer h-fit lg:h-5 md:h-5"
                            >
                                Cập nhật ảnh đại diện
                            </label>
                            <input
                                type="file"
                                id="upload-photo"
                                className="hidden -z-10 cursor-none"
                                onChange={handleUploadAvatar}
                            />
                            {loading ? (
                                <button
                                    type="submit"
                                    className="px-2 py-1 mt-2 font-bold text-white rounded-lg bg-rose-500 lg:py-1 lg:px-2 lg:text-sm lg:absolute lg:bottom-0 md:py-1 md:px-2 md:text-sm md:absolute md:bottom-0"
                                >
                                    Upload
                                </button>
                            ) : (
                                <Fragment />
                            )}
                        </form>
                    </div>
                    <div className="mt-5">
                        <div className="w-11/12 mx-auto">
                            <img
                                src={xacMinhDanhTinhIcon}
                                className="w-8 lg:w-8 md:w-5"
                            />
                            <h2 className="font-bold lg:text-xl md:text-sm">
                                Xác minh danh tính
                            </h2>
                            <p className="lg:text-base md:text-sm">
                                Xác thực danh tính của bạn với huy hiệu xác minh
                                danh tính.
                            </p>
                            <button className="px-2 py-1 font-bold border border-gray-800 rounded-lg hover:bg-gray-200 lg:py-2 lg:px-4 md:py-2 md:px-4">
                                Nhận huy hiệu
                            </button>
                        </div>

                        <div className="w-11/12 mx-auto mt-2 lg:mt-5 lg:pt-5 lg:border-t lg:border-t-gray-300 md:mt-5 md:pt-5 md:border-t md:border-t-gray-300">
                            <p className="my-auto font-bold lg:text-xl md:text-sm">
                                {thongTinNguoiDung.name} đã xác nhận
                            </p>
                            <span>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>{" "}
                            <span>Địa chỉ email</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full my-5 lg:col-span-9 md:col-span-8">
                <div className="w-full lg:p-2 md:p-2">
                    <div className="w-full lg:mb-10 md:mb-10">
                        <h1 className="my-auto text-2xl font-bold text-center lg:text-4xl md:text-2xl">
                            Xin chào, tôi là {thongTinNguoiDung.name}
                        </h1>
                        <p className="my-auto text-center text-gray-500 lg:text-base md:text-base">
                            Bắt đầu tham gia vào 2022
                        </p>
                        <p
                            className="my-auto mt-2 font-bold text-center underline cursor-pointer hover:text-gray-500 lg:text-base lg:mt-2 md:text-base md:mt-2"
                            onClick={() => {
                                handleHienThiChinhSuaThongTin();
                            }}
                        >
                            Xem hồ sơ thông tin cá nhân
                        </p>
                        {formChinhSuaHoSoOpen ? (
                            <FormChinhSuaHoSo
                                thongTinNguoiDung={thongTinNguoiDung}
                            />
                        ) : (
                            <Fragment />
                        )}
                    </div>
                    <div className="flex justify-between mt-5">
                        <div className="w-full lg:mb-10 lg:pb-5 lg:border-b lg:border-b-gray-300 md:mb-10 md:pb-5 md:border-b md:border-b-gray-300 ">
                            <FontAwesomeIcon
                                icon={faStar}
                                className="lg:mb-1 md:mb-1"
                            />{" "}
                            <span className="my-auto font-bold text-center lg:text-2xl md:text-2xl">
                                0 đánh giá
                            </span>
                        </div>
                        <div className="w-full lg:mb-10 lg:pb-5 lg:border-b lg:border-b-gray-300 md:mb-10 md:pb-5 md:border-b md:border-b-gray-300 ">
                            <p className="my-auto font-bold text-center underline cursor-pointer hover:text-gray-500 lg:text-base md:text-base">
                                Đánh giá của bạn
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
