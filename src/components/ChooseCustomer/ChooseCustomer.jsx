import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
export default function ChooseCustomer() {
    let DanhSachLoaitKhach = [
        {
            ten: "Người lớn",
            moTa: "Từ 13 tuổi trở lên",
        },
        {
            ten: "Trẻ em",
            moTa: "Độ tuổi 2 - 12",
        },
        {
            ten: "Em bé",
            moTa: "Dưới 2 tuổi",
        },
        {
            ten: "Thú cưng",
            moTa: "Mang theo động vật cần được phục vụ?",
        },
    ];
    const solutions = [
        {
            name: "Nguời lớn",
            description: "Measure actions your users take",
            href: "##",
        },
        {
            name: "Automations",
            description: "Create your own targeted content",
            href: "##",
        },
        {
            name: "Reports",
            description: "Keep track of your growth",
            href: "##",
        },
    ];
    return (
        <div className="fixed top-16 w-full max-w-sm px-4">
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button
                            className={`
              ${open ? "" : "text-opacity-90"}
              group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                            <span>Solutions</span>
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                                        {solutions.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                            >
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    );
}
