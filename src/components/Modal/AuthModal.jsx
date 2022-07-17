import React from "react";
import Modal from "./Modal";
import { Dialog } from "@headlessui/react";
import FormDangNhap from "../../pages/DangNhapPage/FormDangNhap/FormDangNhap";
import FormDangKy from "../../pages/DangKyPage/FormDangKy/FormDangKy";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModal } from "../../redux/chiTietPhongSlice";
export default function AuthModal() {
    const dispatch = useDispatch();
    const { authModal } = useSelector((state) => state.chiTietPhongSlice);
    const toggleModal = () => {
        dispatch(setAuthModal(false));
    };
    return (
        <div>
            <Modal isOpen={authModal} onClose={toggleModal}>
                <Dialog.Panel className="w-full md:max-w-[35rem] max-w-[25rem] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                    <FormDangNhap></FormDangNhap>
                </Dialog.Panel>
            </Modal>
        </div>
    );
}
