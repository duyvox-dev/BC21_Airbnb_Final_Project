import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import Modal from "../../../components/Modal/Modal";
import BookTicket from "./BookTicket";
import { useDispatch, useSelector } from "react-redux";
import { setBookTicketModal } from "../../../redux/chiTietPhongSlice";
export default function BookTicketModal() {
    const dispatch = useDispatch();
    const { bookTicketModal } = useSelector((state) => state.chiTietPhongSlice);
    const toggleModal = () => {
        dispatch(setBookTicketModal(false));
    };
    return (
        <Modal isOpen={bookTicketModal} onClose={toggleModal}>
            <Dialog.Panel className="w-full md:max-w-[45rem] max-w-[25rem] transform overflow-x-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center p-5 border-b "
                >
                    Đặt phòng
                </Dialog.Title>
                <div className="mt-2 h-[75vh] overflow-y-scroll ">
                    <BookTicket />
                </div>
            </Dialog.Panel>
        </Modal>
    );
}
