import React from 'react';
import { faDongSign, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    InstagramOutlined,
    FacebookOutlined,
    TwitterOutlined,
} from '@ant-design/icons';
import styles from '../css/FooterTemplate.css';

export default function FooterTemplate() {
    return (
        <div className="w-full footer bg-neutral-100">
            <div className="container py-5 mx-auto">
                <div className="hidden px-4 md:block xl:px-0">
                    <div className="grid w-full grid-cols-1 pb-2 mx-auto border-0 border-b border-solid xl:gap-10 xl:grid-cols-4 justify-items-start border-b-neutral-300">
                        <div className="w-full pb-2 border-b xl:border-0">
                            <h3 className="pb-3 text-sm font-bold text-left">
                                Hỗ trợ
                            </h3>
                            <div className="grid w-full grid-cols-3 xl:grid-cols-1">
                                <p className="text-sm text-left cursor-pointer hover:underline">
                                    Trung tâm trợ giúp
                                </p>
                                <p className="text-sm text-left cursor-pointer hover:underline">
                                    AirCover
                                </p>
                                <p className="text-sm text-left cursor-pointer hover:underline">
                                    Thông tin an toàn
                                </p>
                                <p className="text-sm text-left cursor-pointer hover:underline">
                                    Hỗ trợ người khuyết tật
                                </p>
                                <p className="text-sm text-left cursor-pointer hover:underline">
                                    Các tuỳ chọn huỷ
                                </p>
                                <p className="text-sm text-left cursor-pointer hover:underline">
                                    Biện pháp ứng phó với đại dịch COVID-19 của
                                    chúng tôi
                                </p>
                                <p className="text-sm text-left cursor-pointer hover:underline">
                                    Báo cáo lo ngại của hàng xóm
                                </p>
                            </div>
                        </div>

                        <div className="w-full pt-4 pb-2 border-b xl:border-0">
                            <h3 className="pb-3 text-sm font-bold text-left">
                                Cộng đồng
                            </h3>
                            <div className="grid w-full grid-cols-3 xl:grid-cols-1">
                                <p className="text-sm text-left cursor-pointer hover:underline">
                                    Airbnb.org: nhà ở cứu trợ
                                </p>
                                <p className="text-sm text-left cursor-pointer hover:underline">
                                    Hỗ trợ dân tị nạn Afghanistan
                                </p>
                                <p className="text-sm text-left cursor-pointer hover:underline">
                                    Chống phân biệt đối xử
                                </p>
                            </div>
                        </div>

                        <div className="w-full pt-4 pb-2 border-b xl:border-0">
                            <h3 className="pb-3 text-sm font-bold text-left">
                                Đón tiếp khách
                            </h3>
                            <div className="grid w-full grid-cols-3 xl:grid-cols-1">
                                <p className="text-sm text-left cursor-pointer hover:underline">
                                    Thử đón tiếp khách
                                </p>
                                <p className="text-sm text-left cursor-pointer hover:underline">
                                    AirCover cho Chủ nhà
                                </p>
                                <p className="text-sm text-left cursor-pointer hover:underline">
                                    Xem tài nguyên đón tiếp khách
                                </p>
                                <p className="text-sm text-left cursor-pointer hover:underline">
                                    Truy cập diễn đàn cộng đồng
                                </p>
                                <p className="text-sm text-left cursor-pointer hover:underline">
                                    Đón tiếp khách có trách nhiệm
                                </p>
                            </div>
                        </div>

                        <div className="w-full pt-4">
                            <h3 className="pb-3 text-sm font-bold text-left">
                                Airbnb
                            </h3>
                            <div className="grid w-full grid-cols-3 xl:grid-cols-1">
                                <p className="text-sm text-left cursor-pointer hover:underline">
                                    Trang tin tức
                                </p>
                                <p className="text-sm text-left cursor-pointer hover:underline">
                                    Tìm hiểu các tính năng mới
                                </p>
                                <p className="text-sm text-left cursor-pointer hover:underline">
                                    Thư ngõ từ các nhà sáng lập
                                </p>
                                <p className="text-sm text-left cursor-pointer hover:underline">
                                    Cơ hội nghề nghiệp
                                </p>
                                <p className="text-sm text-left cursor-pointer hover:underline">
                                    Nhà đầu tư
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col-reverse justify-between w-full pt-5 xl:flex-row xl:px-2">
                    <div className="flex flex-col justify-center w-full xl:flex-row xl:justify-start">
                        <p className="text-center">
                            2021 AirBnb, Inc. All rights reserved.
                        </p>
                        <div className="flex justify-center space-x-2 xl:ml-5 xl:space-x-4">
                            <p className="mx-1 my-auto text-sm cursor-pointer md:mx-0 md:my-0 lg:mx-0 lg:my-0 hover:underline">
                                Quyền riêng tư
                            </p>
                            <p className="mx-1 my-auto text-sm cursor-pointer md:mx-0 md:my-0 lg:mx-0 lg:my-0 hover:underline">
                                Điều khoản
                            </p>
                            <p className="mx-1 my-auto text-sm cursor-pointer md:mx-0 md:my-0 lg:mx-0 lg:my-0 hover:underline">
                                Sơ đồ trang web
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-full pb-5 xl:justify-end">
                        <FontAwesomeIcon
                            className="my-auto lg:my-0"
                            icon={faGlobe}
                        />
                        <p className="mx-1 my-auto text-sm font-medium cursor-pointer md:text-center lg:my-0 hover:underline">
                            Tiếng Việt (VN)
                        </p>
                        <FontAwesomeIcon
                            className="mx-1 my-auto lg:my-0"
                            icon={faDongSign}
                        />
                        <p className="mx-1 my-auto text-sm font-medium cursor-pointer lg:my-0 hover:underline">
                            VND
                        </p>
                        <div className="ml-5 space-x-2">
                            <FacebookOutlined className="px-1 my-auto text-base cursor-pointer lg:my-0" />
                            <TwitterOutlined className="px-1 my-auto text-base cursor-pointer lg:my-0" />
                            <InstagramOutlined className="px-1 my-auto text-base cursor-pointer lg:my-0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
