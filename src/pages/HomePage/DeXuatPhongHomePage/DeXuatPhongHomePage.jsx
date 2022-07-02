import React from 'react';
import { Tabs } from 'antd';
import DeXuatPhongTab1 from './DeXuatPhongTab1';
import DeXuatPhongTab2 from './DeXuatPhongTab2';
import DeXuatPhongTab3 from './DeXuatPhongTab3';

const { TabPane } = Tabs;

export default function DeXuatPhongHomePage(props) {

    let tabValue = [
        {
            key: 1,
            name: 'Đà Nẵng',
        },
        {
            key: 2,
            name: 'Hà Nội',
        },
        {
            key: 3,
            name: 'Nha Trang, Khánh Hoà',
        },
    ];

    let { danhSachPhong } = props;

    let deXuatDanhSachPhongTab1 = danhSachPhong.filter(item => item.locationId?.province == tabValue[0].name);

    let deXuatDanhSachPhongTab2 = danhSachPhong.filter(item => item.locationId?.province == tabValue[1].name);

    let deXuatDanhSachPhongTab3 = danhSachPhong.filter(item => item.locationId?.province == tabValue[2].name);

    return (
        <div className="w-full mt-10 pb-5">
            <h1 className="w-11/12 mx-auto text-2xl text-center">Những chỗ nghỉ nổi bật khuyến nghị cho bạn</h1>
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab={tabValue[0].name} key={tabValue[0].key}>
                    <DeXuatPhongTab1
                        deXuatDanhSachPhongTab1={deXuatDanhSachPhongTab1}
                    />
                </TabPane>
                <TabPane tab={tabValue[1].name} key={tabValue[1].key}>
                    <DeXuatPhongTab2
                        deXuatDanhSachPhongTab2={deXuatDanhSachPhongTab2}
                    />
                </TabPane>
                <TabPane tab={tabValue[2].name} key={tabValue[2].key}>
                    <DeXuatPhongTab3
                        deXuatDanhSachPhongTab3={deXuatDanhSachPhongTab3}
                    />
                </TabPane>
            </Tabs>
        </div >
    )
}
