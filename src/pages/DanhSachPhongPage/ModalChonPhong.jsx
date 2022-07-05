import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Dialog, Transition } from "@headlessui/react";

import KhoangGia from "./KhoangGia";
import PhongNgu from "./PhongNgu";
import TienNghi from "./TienNghi";

export default function ModalChonPhong() {
  const { danhSachPhong } = useSelector((state) => state.danhSachPhongSlice);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 w-full text-center py-5 bg-white z-10">
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
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setIsOpen(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95 -translate-y-full"
                    enterTo="opacity-100 scale-100 translate-y-0"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100 translate-y-0"
                    leaveTo="opacity-0 scale-95 translate-y-full"
                  >
                    <Dialog.Panel className="w-full md:max-w-[45rem] max-w-[25rem] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 text-center p-5 border-b"
                      >
                        Bộ lọc
                      </Dialog.Title>
                      <div className="mt-2 h-[75vh] overflow-y-scroll">
                        <div className="p-5">
                          <KhoangGia />
                          <PhongNgu />
                          <TienNghi />
                        </div>
                      </div>

                      <div className="py-4 px-5 border-t">
                        <div className="flex justify-between">
                          <button className="text-lg font-medium underline rounded-lg px-2 hover:bg-stone-100 transition-all duration-300">
                            Xóa tất cả
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-stone-700 px-4 py-2 text-base font-medium text-white hover:bg-stone-900 transition-all duration-300"
                            onClick={() => setIsOpen(false)}
                          >
                            Hiển thị hơn {danhSachPhong?.length} chỗ ở
                          </button>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
    </>
  );
}
