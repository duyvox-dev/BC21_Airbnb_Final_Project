import React from 'react';
import { faDongSign, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InstagramOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import styles from '../css/FooterTemplate.css';

export default function FooterTemplate() {

  return (
    <div className='footer w-full bg-neutral-100'>
      <div className='w-11/12 mx-auto py-5'>
        <div className='w-full mx-auto grid grid-cols-4 justify-items-center gap-10 border-solid border-0 border-b border-b-neutral-300 pb-2'>
          <div>
            <h3 className='font-bold 
            sm:text-xs sm:text-center
            xs:text-xs xs:text-center'>GIỚI THIỆU</h3>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>Phương thức hoạt động của AirBnb</p>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>Trang tin tức</p>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>Nhà đầu tư</p>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>AirBnb Plus</p>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>AirBnb Luxe</p>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>Hotel Tonight</p>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>AirBnb for work</p>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>Nhờ có Host - mọi điều đều có thể</p>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>Cơ hội nghề nghiệp</p>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>Thư của nhà sáng lập</p>
          </div>

          <div className='footer-menu-item-list'>
            <h3 className='font-bold 
            sm:text-xs sm:text-center
            xs:text-xs xs:text-center'>CỘNG ĐỒNG</h3>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>Sự đa dạng và cảm giác thân thuộc</p>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>Tiện nghi phù hợp cho người khuyết tật</p>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>Đối tác liên kết AirBnb</p>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>Chỗ ở cho tuyến đầu</p>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>Lượt giới thiệu của khách</p>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>AirBnb.org</p>
          </div>

          <div className='footer-menu-item-list'>
            <h3 className='font-bold 
            sm:text-xs sm:text-center
            xs:text-xs xs:text-center'>ĐÓN TIẾP KHÁCH</h3>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>Cho thuê nhà</p>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>Tổ chức trải nghiệm trực tuyến</p>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>Tổ chức trải nghiệm</p>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>Đón tiếp khách có trách nhiệm</p>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>Trung tâm tài nguyên</p>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>Trung tâm cộng đồng</p>
          </div>

          <div className='footer-menu-item-list'>
            <h3 className='font-bold 
            sm:text-xs sm:text-center
            xs:text-xs xs:text-center'>HỖ TRỢ</h3>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi</p>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>Trung tâm giúp đỡ</p>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>Các tuỳ chỉnh huỷ</p>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>Hỗ trợ khu dân cư</p>
            <p className='cursor-pointer hover:underline md:text-xs sm:text-xssm:text-center xs:text-xs xs:text-center'>Tin cậy và an toàn</p>
          </div>
        </div>
        <div className='w-full flex justify-between
        lg:pt-5 lg:px-2
        md:mt-1
        sm:flex-wrap
        xs:flex-wrap'>
          <div className='flex justify-between
          lg:w-5/12
          md:w-8/12
          sm:w-full sm:flex-wrap sm:justify-center sm:mb-2
          xs:w-full xs:flex-wrap xs:justify-center xs:mb-2'>
            <p className='md:text-xs 
            sm:text-xs sm:w-full sm:text-center sm:mb-1
            xs:text-xs xs:w-full xs:text-center xs:mb-1'>2021 AirBnb, Inc. All rights reserved</p>
            <p className='xs:hidden sm:hidden'>|</p>
            <p className='md:text-xs sm:text-xs sm:my-auto sm:mx-1 xs:text-xs xs:my-auto xs:mx-1'>Quyền riêng tư</p>
            <p className='xs:hidden sm:hidden'>|</p>
            <p className='md:text-xs sm:text-xs sm:my-auto sm:mx-1 xs:text-xs xs:my-auto xs:mx-1'>Điều khoản</p>
            <p className='xs:hidden sm:hidden'>|</p>
            <p className='md:text-xs sm:text-xs sm:my-auto sm:mx-1 xs:text-xs xs:my-auto xs:mx-1'>Sơ đồ trang web</p>
          </div>
          <div className='flex 
          xs:w-full
          sm:w-full
          lg:w-3/12 lg:justify-end
          md:w-4/12 md:flex md:flex-wrap md:justify-end'>
            <div className='w-full flex 
            md:justify-end md:mb-2'>
              <div className='flex 
              lg:justify-center lg:w-full
              md:justify-end'>
                <FontAwesomeIcon className='my-auto' icon={faGlobe} />
                <p className='my-auto mx-1 
                md:text-xs md:text-center
                sm:text-xs
                xs:text-xs'>
                  Tiếng Việt (VN)
                </p>
              </div>
              <div className='flex 
              lg:justify-center lg:w-full
              md:justify-end'>
                <FontAwesomeIcon className='my-auto mx-1' icon={faDongSign} />
                <p className='my-auto mx-1 
                md:text-xs 
                sm:text-xs
                xs:text-xs'>
                  VND
                </p>
              </div>
            </div>
            <div className='flex items-center 
            lg:justify-between
            md:w-full md:justify-end'>
              <FacebookOutlined className='px-1 my-auto text-base' />
              <TwitterOutlined className='px-1 my-auto text-base' />
              <InstagramOutlined className='px-1 my-auto text-base' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}