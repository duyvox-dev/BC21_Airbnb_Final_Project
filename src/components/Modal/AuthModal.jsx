import React from "react";
import Modal from "./Modal";
import { Dialog } from "@headlessui/react";
import FormDangNhap from "../../pages/DangNhapPage/FormDangNhap/FormDangNhap";
import FormDangKy from "../../pages/DangKyPage/FormDangKy/FormDangKy";
export default function AuthModal({ isModalOpen, toggleModal }) {
  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <Dialog.Panel className="w-full md:max-w-[35rem] max-w-[25rem] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
          <FormDangNhap></FormDangNhap>
        </Dialog.Panel>
      </Modal>
    </div>
  );
}
