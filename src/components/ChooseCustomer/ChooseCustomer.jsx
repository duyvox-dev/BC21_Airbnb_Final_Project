import { Popover } from "@headlessui/react";
import { useEffect, useState } from "react";
import ChooseCustomerItem from "./ChooseCustomerItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
    setCustomerInfo,
    setTotalCustomer,
} from "../../redux/bookingRoomSlice";
import _ from "lodash";
export default function ChooseCustomer({ handleChooseCustomer, limit = 999 }) {
    const [disabledSide, setDisabledSide] = useState("");
    const dispatch = useDispatch();
    const { totalCustomer, customerInfo } = useSelector(
        (state) => state.bookingRoomSlice
    );
    const incQuantity = (index) => {
        let newCustomerInfo = _.cloneDeep(customerInfo);
        newCustomerInfo[index].quantity += 1;
        dispatch(setCustomerInfo(newCustomerInfo));
    };
    const decQuantity = (index) => {
        let newCustomerInfo = _.cloneDeep(customerInfo);

        newCustomerInfo[index].quantity = Math.max(
            0,
            newCustomerInfo[index].quantity - 1
        );
        dispatch(setCustomerInfo(newCustomerInfo));
    };
    const countTotalCustomer = () => {
        return customerInfo.reduce((sum, customer) => {
            return sum + customer.quantity;
        }, 0);
    };

    useEffect(() => {
        dispatch(setTotalCustomer(countTotalCustomer()));
    }, [customerInfo]);
    useEffect(() => {
        if (limit && totalCustomer >= limit) setDisabledSide("inc");
        else if (totalCustomer < 0) setDisabledSide("dec");
        else setDisabledSide("");
    }, [totalCustomer]);

    return (
        <div className="w-full">
            {" "}
            <Popover className="relative">
                <Popover.Button className="outline-none border-none block w-full text-left">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="font-semibold block">Khách</span>
                            <span>{totalCustomer} Khách</span>
                        </div>

                        <span>
                            <FontAwesomeIcon
                                className="text-xl"
                                icon={faAngleDown}
                            />
                        </span>
                    </div>
                </Popover.Button>

                <Popover.Panel className="absolute z-10 top-[50px] -left-[17px]">
                    <div className="flex flex-col gap-5 bg-white p-5 shadow w-full border border-slate-300 rounded">
                        {customerInfo.map((loaiKhach, index) => {
                            return (
                                <ChooseCustomerItem
                                    data={loaiKhach}
                                    key={index}
                                    index={index}
                                    incQuantity={incQuantity}
                                    decQuantity={decQuantity}
                                    disabled={disabledSide}
                                />
                            );
                        })}
                    </div>
                </Popover.Panel>
            </Popover>
        </div>
    );
}
