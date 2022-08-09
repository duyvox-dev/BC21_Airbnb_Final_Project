import React from "react";

export default function ChooseCustomerItem({
    data,
    index,
    disabled = "",
    incQuantity = () => {},
    decQuantity = () => {},
}) {
    return (
        <div>
            <div className="flex justify-between items-center cursor-default">
                <div className="w-1/2">
                    <h4 className="font-semibold text-lg m-0">
                        {data.customerType}
                    </h4>
                    <span className="text-gray-500">{data.description}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className={`w-[30px] h-[30px] text-lg border border-slate-300 rounded-full flex justify-center items-center ${
                            disabled == "dec"
                                ? " border-slate-100 text-slate-300 cursor-not-allowed"
                                : ""
                        }`}
                        disabled={disabled == "dec"}
                        onClick={() => {
                            decQuantity(index);
                        }}
                    >
                        <span>-</span>
                    </button>
                    <span>{data.quantity}</span>
                    <button
                        className={`w-[30px] h-[30px] text-lg border border-slate-300 rounded-full flex justify-center items-center ${
                            disabled == "inc"
                                ? " border-slate-100 text-slate-300 cursor-not-allowed"
                                : ""
                        }`}
                        disabled={disabled == "inc"}
                        onClick={() => {
                            incQuantity(index);
                        }}
                    >
                        <span>+</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
