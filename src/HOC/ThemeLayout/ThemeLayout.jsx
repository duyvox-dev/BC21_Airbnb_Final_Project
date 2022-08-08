import React, { Fragment } from "react";
import FooterTemplate from "./FooterTemplate/FooterTemplate";
import HeaderTemplate from "./HeaderTemplate/HeaderTemplate";
import BackToTopBtn from "../../components/BackToTopBtn";
export default function ThemeLayout(props) {
    return (
        <div className="w-full overflow-hidden">
            <HeaderTemplate />
            <props.Component />
            <BackToTopBtn />
            <FooterTemplate />
        </div>
    );
}
