import React from "react";
import spinner from "./SpinnerContainer.svg";
import "./SpinnerContainer.css";

export function SpinnerContainer() {
    return (
        <div className={"justify-center items-center w-full h-screen overflow-hidden m-0 p-0 absolute top-0 left-0 z-40 bg-white opacity-80 flex"}>
            <img src={spinner} alt="spinner" className="spinning" />
        </div>
    );
}
