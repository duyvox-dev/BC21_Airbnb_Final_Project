import React from "react";
import ScrollToTop from "react-scroll-to-top";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
export default function BackToTopBtn() {
    return (
        <ScrollToTop
            className=" text-rose-500 text-2xl"
            smooth
            component={<FontAwesomeIcon icon={faAngleUp} />}
            style={{ bottom: "80px", right: "40px" }}
        />
    );
}
