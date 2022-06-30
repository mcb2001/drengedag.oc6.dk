import React from "react";
import spinner from "./SpinnerContainer.svg";
import "./SpinnerContainer.css";
import { classNames } from "../../oc6";

interface ISpinnerContainerProps {
    visible: boolean;
}

export function SpinnerContainer({ visible }: ISpinnerContainerProps) {
    const visibilityClass = visible ? "flex" : "hidden";

    return (
        <div className={
            classNames("justify-center items-center",
                "w-full h-screen overflow-hidden m-0 p-0",
                "absolute top-0 left-0 z-30",
                "bg-white opacity-80",
                visibilityClass)}>
            <img src={spinner} alt="spinner" className="spinning" />
        </div>
    );
}
