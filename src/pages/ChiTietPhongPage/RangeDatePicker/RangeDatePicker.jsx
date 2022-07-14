import React from "react";
import { DatePicker } from "antd";
import "./css/datePicker.css";
import moment from "moment";
const { RangePicker } = DatePicker;
export default function RangeDatePicker({
    onChange = () => {},
    defaultDate = {},
}) {
    let defaultBookingDate = [
        moment(defaultDate?.checkIn, "YYYY-MM-DD"),
        moment(defaultDate?.checkOut, "YYYY-MM-DD"),
    ];
    if (!defaultBookingDate[0]._isValid || !defaultBookingDate[0]._isValid) {
        defaultBookingDate = [];
    }
    return (
        <div>
            <RangePicker
                className="date-picker-custom"
                onCalendarChange={onChange}
                defaultValue={defaultBookingDate}
            />
        </div>
    );
}
