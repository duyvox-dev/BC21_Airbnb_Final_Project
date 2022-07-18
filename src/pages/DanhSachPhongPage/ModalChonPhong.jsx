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
      <div className="sticky top-0 w-full text-center py-5 bg-white z-10 border-b">
        <div className="flex justify-center items-center space-x-32">
          <div className="font-medium text-lg">
            Hơn {danhSachPhong?.length} chỗ ở
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 rounded-lg flex justify-center items-center space-x-2 border"
          >
            <FontAwesomeIcon icon={faArrowRightArrowLeft} />
            <div>Bộ lọc</div>
          </button>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            children={
              <Dialog.Panel className="w-full h-[80%] md:max-w-[35rem] lg:max-w-[45rem]  max-w-[80%] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all relative">
                <div className="text-lg font-medium text-gray-900 text-center p-5 border-b fixed top-0 w-full bg-white z-10">
                  Bộ lọc
                </div>
                <div className="py-20 h-[100%] overflow-y-scroll">
                  <div className="p-5">
                    <KhoangGia />
                    <PhongNgu />
                    <TienNghi />
                  </div>
                </div>

                <div className="py-4 px-5 border-t fixed bottom-0 w-full bg-white z-10">
                  <div className="flex justify-between">
                    <button
                      className="text-lg font-medium underline rounded-lg px-2 hover:bg-stone-100 transition-all duration-300"
                      onClick={() => dispatch(deleteAllSearchRoomList())}
                    >
                      Xóa tất cả
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-stone-700 px-4 py-2 text-base font-medium text-white hover:bg-stone-900 transition-all duration-300"
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
