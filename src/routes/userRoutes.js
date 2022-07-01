import ThemeLayout from "../HOC/ThemeLayout/ThemeLayout";
import ChiTietPhongPage from "../pages/ChiTietPhongPage/ChiTietPhongPage";
import DangKyPage from "../pages/DangKyPage/DangKyPage";
import DangNhapPage from "../pages/DangNhapPage/DangNhapPage";
import DanhSachPhongPage from "../pages/DanhSachPhongPage/DanhSachPhongPage";
import HomePage from "../pages/HomePage/HomePage";
import ThongTinCaNhan from "../pages/ThongTinCaNhanPage/ThongTinCaNhan";

export const userRoutes = [
    {
        path: "/user/:id",
        component: <ThemeLayout Component={ThongTinCaNhan} />,
        exact: true,
    },
    {
        path: "/register",
        component: <ThemeLayout Component={DangKyPage} />,
        exact: true,
    },
    {
        path: "/login",
        component: <ThemeLayout Component={DangNhapPage} />,
        exact: true,
    },
    {
        path: "/rooms/:id",
        component: <ThemeLayout Component={ChiTietPhongPage} />,
        exact: true,
    },
    {
        path: "/rooms",
        component: <ThemeLayout Component={DanhSachPhongPage} />,
        exact: true,
    },
    {
        path: "/",
        component: <ThemeLayout Component={HomePage} />,
        exact: true,
    },
];
