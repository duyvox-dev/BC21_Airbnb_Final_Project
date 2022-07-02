import React, { useEffect } from "react";
import Slider from "react-slick";
import styles from '../css/HomePage.css';
import { layDanhSachViTriDanhGiaCao, setDanhSachDiaDiemThuHutService } from "../../redux/viTriSlice";
import { useDispatch, useSelector } from "react-redux";
import { viTriService } from "../../services/viTriService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { phongService } from "../../services/phongService";
import { layDanhSachPhong, setDanhSachPhongService } from "../../redux/phongSlice";
import { danhGiaService } from "../../services/danhGiaService";
import { layDanhSachDanhGia, setDanhSachDanhGiaPhongService } from "../../redux/danhGiaSlice";
import BannerHomePage from "./BannerHomePage/BannerHomePage";
import ViTriThuHutSliderHomePage from "./ViTriThuHutSliderHomePage/ViTriThuHutSliderHomePage";
import LoaiHinhTienIchSliderHomePage from "./LoaiHinhTienIchSliderHomePage/LoaiHinhTienIchSliderHomePage";
import DeXuatPhongHomePage from "./DeXuatPhongHomePage/DeXuatPhongHomePage";
import DanhGiaSliderHomePage from "./DanhGiaSliderHomePage/DanhGiaSliderHomePage";

export default function HomePage() {

    let diemDanhGiaDiaDanhThuHut = 9; //Lấy danh sách vị trí có điểm đánh giá là 9

    let idViTriTimPhong = ''; //Lấy danh sách tất cả phòng tại mọi tỉnh thành

    let idPhongLayDanhGia = '6172311fefe193001c0a79a4';

    let dispatch = useDispatch();

    useEffect(() => {
        //Lấy danh sách vị trí có điểm đánh giá cao
        dispatch(setDanhSachDiaDiemThuHutService(diemDanhGiaDiaDanhThuHut));

        //Lấy danh sách tất cả phòng tại mọi tỉnh thành
        dispatch(setDanhSachPhongService(idViTriTimPhong));

        //Lấy danh sách đánh giá của phòng cụ thể
        dispatch(setDanhSachDanhGiaPhongService(idPhongLayDanhGia));
    }, []);

    let { danhSachViTriDanhGiaCao } = useSelector(state => state.viTriSlice);

    let { danhSachPhong } = useSelector(state => state.phongSlice);

    let { danhSachDanhGia } = useSelector(state => state.danhGiaSlice);

    return <div
        className='homepage w-full'>
        <BannerHomePage />
        <div className='w-11/12 mx-auto'>
            <ViTriThuHutSliderHomePage danhSachViTriDanhGiaCao={danhSachViTriDanhGiaCao} />
            <LoaiHinhTienIchSliderHomePage />
            <DeXuatPhongHomePage danhSachPhong={danhSachPhong} />
            <DanhGiaSliderHomePage danhSachDanhGia={danhSachDanhGia} />
        </div>
    </div>
}
