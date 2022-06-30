import { Tabs, DatePicker, Popover, Menu } from 'antd';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faGlobe, faMagnifyingGlass, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment } from 'react';
import styled from '../css/HeaderTemplate.css';
import { Link } from 'react-router-dom';
import MenuItem from 'antd/lib/menu/MenuItem';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

export default function HeaderTemplate() {

  const contentViTri = (
    <div>
      <p>TP.HCM</p>
      <p>Hà Nội</p>
      <p>Đà Nẵng</p>
    </div>
  );

  const onChangeDatePicker = (key) => {
    console.log(key);
  };

  const contentLoaitKhach = (
    <div className='w-full'>
      <div className='w-full mb-2 grid grid-cols-3 border-solid border-0 border-b border-b-neutral-300 pb-2'>
        <div className='col-span-2 flex flex-wrap align-middle'>
          <p className='w-full my-auto font-bold'>Người lớn</p>
          <p className='w-full my-auto'>Từ 13 tuổi trở lên</p>
        </div>
        <div className='col-span-1 ml-3 flex justify-between items-center'>
          <button className='w-8 h-8 rounded-full cursor-pointer border border-neutral-300 active:shadow-lg active:bg-neutral-300'>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <p className='my-auto'>0</p>
          <button className='w-8 h-8 rounded-full cursor-pointer border border-neutral-300 active:shadow-lg active:bg-neutral-300'>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>

      <div className='w-full mb-2 grid grid-cols-3 border-solid border-0 border-b border-b-neutral-300 pb-2'>
        <div className='col-span-2 flex flex-wrap align-middle'>
          <p className='w-full my-auto font-bold'>Trẻ em</p>
          <p className='w-full my-auto'>Độ tuổi 2 - 12</p>
        </div>
        <div className='col-span-1 ml-3 flex justify-between items-center'>
          <button className='w-8 h-8 rounded-full cursor-pointer border border-neutral-300 active:shadow-lg active:bg-neutral-300'>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <p className='my-auto'>0</p>
          <button className='w-8 h-8 rounded-full cursor-pointer border border-neutral-300 active:shadow-lg active:bg-neutral-300'>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>

      <div className='w-full mb-2 grid grid-cols-3 border-solid border-0 border-b border-b-neutral-300 pb-2'>
        <div className='col-span-2 flex flex-wrap align-middle'>
          <p className='w-full my-auto font-bold'>Em bé</p>
          <p className='w-full my-auto'>Dưới 2 tuổi</p>
        </div>
        <div className='col-span-1 ml-3 flex justify-between items-center'>
          <button className='w-8 h-8 rounded-full cursor-pointer border border-neutral-300 active:shadow-lg active:bg-neutral-300'>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <p className='my-auto'>0</p>
          <button className='w-8 h-8 rounded-full cursor-pointer border border-neutral-300 active:shadow-lg active:bg-neutral-300'>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>

      <div className='w-full mb-2 grid grid-cols-3 border-solid border-0 border-b border-b-neutral-300 pb-2'>
        <div className='col-span-2 flex flex-wrap align-middle'>
          <p className='w-full my-auto font-bold'>Thú cưng</p>
          <p className='w-full my-auto'>Bạn sẽ mang theo động vật?</p>
        </div>
        <div className='col-span-1 ml-3 flex justify-between items-center'>
          <button className='w-8 h-8 rounded-full cursor-pointer border border-neutral-300 active:shadow-lg active:bg-neutral-300'>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <p className='my-auto'>0</p>
          <button className='w-8 h-8 rounded-full cursor-pointer border border-neutral-300 active:shadow-lg active:bg-neutral-300'>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </div>
  );

  const contentMenuBar = (
    <Menu className='w-52'>
      <MenuItem className='w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300'>
        <Link to={'/login'}>
          Đăng ký
        </Link>
      </MenuItem>
      <MenuItem className='w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300'>
        <Link to={'/register'}>
          Đăng nhập
        </Link>
      </MenuItem>
      <MenuItem className='w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300'>
        <Link to={'/'}>
          Cho thuê nhà
        </Link> 
      </MenuItem>
      <MenuItem className='w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300'>
        <Link to={'/'}>
          Tổ chức trải nghiệm
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <div className='header w-full pt-5 pb-5 bg-white shadow-md'>
      <div className='header-container w-11/12 mx-auto grid grid-cols-12'>
        <div className='col-span-1 cursor-pointer'>
          <img className='w-full' src='../img/airbnb-logo3.png' />
        </div>
        <div className='search-bar-container col-span-8 w-full mx-auto'>
          <Tabs defaultActiveKey="1" centered onChange={onChangeDatePicker}>
            <TabPane tab="Chỗ ở" key="1">
              <div className='search-bar-container'>
                <div className='search-bar-inner w-full grid grid-cols-12 bg-gray-100 rounded-full border-solid border border-neutral-300'>
                  <Popover
                    className='location-input-block col-span-5 h-16 rounded-full px-5 py-2 cursor-pointer'
                    content={contentViTri}
                    title="Tìm kiếm phòng theo khu vực"
                    trigger="click">
                    <label className='location-input-name w-full font-bold pointer-events-none'>Địa điểm</label>
                    <input className='location-input w-full bg-transparent border-none focus:outline-none' placeholder='Tìm kiếm điểm đến' />
                  </Popover>
                  <div className='date-input-block col-span-4 h-16 bg-transparent cursor-pointer flex flex-row flex-wrap items-stretch relative'>
                    <div className='date-input-item w-6/12 py-2 relative'>
                      <span className='date-input-name w-full absolute z-20 font-bold flex items-start justify-center pointer-events-none'>
                        Nhận phòng
                      </span>
                    </div>
                    <div className='date-input-item w-6/12 py-2 relative'>
                      <span className='date-input-name w-full absolute z-20 font-bold flex items-start justify-center pointer-events-none'>
                        Trả phòng
                      </span>
                    </div>
                    <RangePicker className='date-picker-container' />
                  </div>
                  <div className='col-span-3 h-16 px-2 rounded-full flex justify-between cursor-pointer hover:bg-gray-200'>
                    <Popover overlayClassName='rounded-lg' className='pl-3 py-2 w-full bg-transparent border-none' content={contentLoaitKhach} trigger="click">
                      <label className='w-full font-bold pointer-events-none'>Khách</label>
                      <p className='w-full text-gray-300 pointer-events-none'>Chọn khách</p>
                    </Popover>
                    <button className='rounded-full w-14 h-12 my-auto border-none bg-rose-500 text-white cursor-pointer active:bg-rose-700 active:shadow-lg'>
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Trải nghiệm" key="2">
              Trải nghiệm
            </TabPane>
          </Tabs>
        </div>
        <div className='col-span-3 flex justify-end'>
          <div>
            <button type='button' className='bg-inherit border-none cursor-pointer text-base px-4 h-10 rounded-full hover:bg-gray-100'>
              Trở thành chủ nhà
            </button>
          </div>
          <div className='mx-3'>
            <button className='bg-inherit border-none cursor-pointer text-base w-10 h-10 rounded-full hover:bg-gray-100'>
              <FontAwesomeIcon icon={faGlobe} />
            </button>
          </div>
          <div>
            <Popover
              className='w-20 h-10 rounded-full cursor-pointer flex justify-around items-center bg-white border-solid border border-neutral-300 hover:shadow-lg'
              content={contentMenuBar}
              trigger="click"
            >
              <FontAwesomeIcon className='text-base' icon={faBars} />
              <FontAwesomeIcon className='text-3xl' icon={faCircleUser} />
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
