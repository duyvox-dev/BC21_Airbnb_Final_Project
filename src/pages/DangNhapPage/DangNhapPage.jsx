import React, { useEffect } from "react";
import { Form, Input, message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDataDangNhap } from "../../redux/authSlice";

export default function DangNhapPage() {
  const { userLogin } = useSelector((state) => state.authSlice);
  const { isLoggedIn } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateMessages = {
    required: "${label} không được để trống",
    whitespace: "${label} không được để trống",
    types: {
      email: "${label} không hợp lệ",
      number: "${label} không hợp lệ",
    },
  };

  useEffect(() => {
    if (userLogin) {
      navigate("/");
      message.warning(
        "Bạn đã đăng nhập rồi, vui lòng đăng xuất trước khi đăng nhập tài khoản!"
      );
      isLoggedIn && navigate("/");
    }
  }, [userLogin, isLoggedIn]);

  const onFinish = (values) => {
    dispatch(postDataDangNhap(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="p-10 flex justify-center">
      <div className="border border-black rounded-xl truncate">
        <div className="px-7 h-16 flex justify-center items-center border-b font-bold text-xl uppercase">
          Đăng nhập
        </div>
        <div className="p-7">
          <div className="mb-4 font-medium text-lg">
            Chào mừng bạn đến với Airbnb
          </div>
          <Form
            className="font-medium"
            labelCol={{ span: 5 }}
            style={{ width: "500px" }}
            validateMessages={validateMessages}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              hasFeedback
              rules={[
                {
                  required: true,
                  type: "email",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              hasFeedback
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item className="truncate" style={{ margin: "0" }}>
              <button
                className="p-3 relative text-white w-full rounded-lg font-medium uppercase text-lg after:content-[''] after:w-full after:bg-white after:absolute after:top-full after:h-full after:left-0 after:text-white after:rounded-lg after:duration-300 after:hover:-translate-y-full after:hover:bg-[#ff5a5f] after:mix-blend-screen"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at center,#FF385C 0%,#E61E4D 27.5%,#E31C5F 40%,#D70466 57.5%, #BD1E59 75%,#BD1E59 100%",
                }}
              >
                <span>Đăng nhập</span>
              </button>
            </Form.Item>
          </Form>
          <div className="flex justify-end mt-4">
            <NavLink
              to={`/register`}
              className="text-[#ff5a5f] rounded-md text-right font-medium text-base  hover:bg-[#ff5a5f] hover:text-white transition-all duration-300"
            >
              <div className="p-2">Bạn chưa có tài khoản? Đăng ký</div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
