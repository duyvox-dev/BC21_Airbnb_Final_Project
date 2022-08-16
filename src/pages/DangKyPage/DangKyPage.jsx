import { message } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormDangKy from "./FormDangKy/FormDangKy";

export default function DangKyPage() {
    const { userLogin } = useSelector((state) => state.authSlice);
    const { isRegisterred } = useSelector((state) => state.authSlice);
    const navigate = useNavigate();

    useEffect(() => {
        if (userLogin) {
            navigate("/");
            message.warning(
                "Bạn đã đăng nhập, vui lòng đăng xuất trước khi đăng ký"
            );
        }
        isRegisterred && navigate("/login");
    }, [isRegisterred, userLogin]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    document.title = "Airbnb® | Đăng ký";
    return (
        <div className="p-10 pt-[136px] flex justify-center">
            <FormDangKy />
        </div>
    );
}
