import React, { useEffect } from "react";
import styles from "../css/HomePage.css";
import {
    getDanhSachDiaDiemThuHut,
    getDanhSachViTri,
    selectDanhSachViTri,
    selectDanhSachViTriDanhGiaCao,
} from "../../redux/viTriSlice";
import { useDispatch, useSelector } from "react-redux";
import { getDanhSachPhong, selectDanhSachPhong } from "../../redux/phongSlice";
import {
    getDanhSachDanhGiaPhong,
    selectDanhSachDanhGia,
} from "../../redux/danhGiaSlice";
import BannerHomePage from "./BannerHomePage/BannerHomePage";
import ViTriThuHutSliderHomePage from "./ViTriThuHutSliderHomePage/ViTriThuHutSliderHomePage";
import LoaiHinhTienIchSliderHomePage from "./LoaiHinhTienIchSliderHomePage/LoaiHinhTienIchSliderHomePage";
import DeXuatPhongHomePage from "./DeXuatPhongHomePage/DeXuatPhongHomePage";
import DanhGiaSliderHomePage from "./DanhGiaSliderHomePage/DanhGiaSliderHomePage";

export default function HomePage() {
    document.title = `Airbnb - Đặt phòng giá tốt`;

    let diemDanhGiaDiaDanhThuHut = 9; //Lấy danh sách vị trí có điểm đánh giá là 9

    let idViTriTimPhong = ""; //Lấy danh sách tất cả phòng tại mọi tỉnh thành

    let idPhongLayDanhGia = "6172311fefe193001c0a79a4";

    let dispatch = useDispatch();

    useEffect(() => {
        //Lấy danh sách vị trí có điểm đánh giá cao
        dispatch(getDanhSachDiaDiemThuHut(diemDanhGiaDiaDanhThuHut));

        //Lấy danh sách tất cả vị trí
        dispatch(getDanhSachViTri());

        //Lấy danh sách tất cả phòng tại mọi tỉnh thành
        dispatch(getDanhSachPhong(idViTriTimPhong));

        //Lấy danh sách đánh giá của phòng cụ thể
        dispatch(getDanhSachDanhGiaPhong(idPhongLayDanhGia));
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    let danhSachViTriDanhGiaCao = useSelector(selectDanhSachViTriDanhGiaCao);

    let danhSachPhong = useSelector(selectDanhSachPhong);

    let danhSachDanhGia = useSelector(selectDanhSachDanhGia);

    let danhSachViTri = useSelector(selectDanhSachViTri);

    return (
        <div className="homepage w-full pt-[86px]">
            <BannerHomePage />
            <div className="w-11/12 mx-auto">
                <ViTriThuHutSliderHomePage
                    danhSachViTriDanhGiaCao={danhSachViTriDanhGiaCao}
                />
                <LoaiHinhTienIchSliderHomePage />
                <DeXuatPhongHomePage
                    danhSachPhong={danhSachPhong}
                    danhSachViTri={danhSachViTri}
                />
                <DanhGiaSliderHomePage danhSachDanhGia={danhSachDanhGia} />
            </div>
        </div>
    );
}
