import React from "react";
import Modal from "../../components/Modal/Modal";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDirectModal } from "../../redux/chiTietPhongSlice";
export default function ModalDirect({ modalDetail = {} }) {
    const dispatch = useDispatch();
    const { directModal } = useSelector((state) => state.chiTietPhongSlice);
    const navigate = useNavigate();
    const toggleModal = () => {
        dispatch(setDirectModal(false));
    };
    const handleNavigate = (path, redirect) => {
        dispatch(setDirectModal(false));
        if (!redirect) navigate(path);
        else navigate(path, { state: redirect });
    };

    return (
        <Modal isOpen={directModal} onClose={toggleModal} staticStatus={true}>
            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all z-50">
                <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                >
                    {modalDetail.title}
                </Dialog.Title>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        {modalDetail.message}
                    </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-300 flex gap-5">
                    {modalDetail.actions.map((action, index) => {
                        return (
                            <button
                                type="button"
                                key={index}
                                className={
                                    "  duration-300 ease-in-out  rounded-md   py-2  px-5 font-semibold text-white " +
                                    (action.type == "normal"
                                        ? "bg-gray-500 hover-gray-500/90"
                                        : "bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 hover:bg-gradient-to-l")
                                }
                                onClick={() => {
                                    if (action.redirect)
                                        handleNavigate(
                                            action.path,
                                            action.redirect
                                        );
                                    else handleNavigate(action.path);
                                }}
                            >
                                {action.name}
                            </button>
                        );
                    })}
                </div>
            </Dialog.Panel>
        </Modal>
    );
}
