import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Dialog, Transition } from "@headlessui/react";

import KhoangGia from "./KhoangGia";
import PhongNgu from "./PhongNgu";
import TienNghi from "./TienNghi";
import Modal from "../../components/Modal/Modal";
import {
  deleteAllSearchRoomList,
  handleSearchRoomList,
} from "../../redux/danhSachPhongSlice";

export default function ModalChonPhong() {
  const { danhSachPhong } = useSelector((state) => state.danhSachPhongSlice);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  let onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed z-10 w-full py-5 text-center bg-white border-b top-[8rem]">
        <div className="flex items-center justify-center space-x-32">
          <div className="text-lg font-medium">
            Hơn {danhSachPhong?.length} chỗ ở
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center px-4 py-2 space-x-2 border rounded-lg"
          >
            <FontAwesomeIcon icon={faArrowRightArrowLeft} />
            <div>Bộ lọc</div>
          </button>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            children={
              <Dialog.Panel className="w-full h-[80%] md:max-w-[35rem] lg:max-w-[45rem]  max-w-[80%] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all relative">
                <div className="fixed top-0 z-10 w-full p-5 text-lg font-medium text-center text-gray-900 bg-white border-b">
                  Bộ lọc
                </div>
                <div className="py-20 h-[100%] overflow-y-scroll">
                  <div className="p-5">
                    <KhoangGia />
                    <PhongNgu />
                    <TienNghi />
                  </div>
                </div>

                <div className="fixed bottom-0 z-10 w-full px-5 py-4 bg-white border-t">
                  <div className="flex justify-between">
                    <button
                      className="px-2 text-lg font-medium underline transition-all duration-300 rounded-lg hover:bg-stone-100"
                      onClick={() => dispatch(deleteAllSearchRoomList())}
                    >
                      Xóa tất cả
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-base font-medium text-white transition-all duration-300 border border-transparent rounded-md bg-stone-700 hover:bg-stone-900"
                      onClick={() => {
                        setIsOpen(false);
                        dispatch(handleSearchRoomList());
                      }}
                    >
                      Tìm kiếm
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            }
          />
        </div>
      </div>
    </>
  );
}
