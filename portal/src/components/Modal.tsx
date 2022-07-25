import React from "react";

interface IModalProps extends React.PropsWithChildren {
    visible: boolean;
    onClick: () => void;
}

export function Modal(props: IModalProps) {
    const ref = React.useRef(null);

    function onClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (event.target === ref.current) {
            props.onClick();
        }
    }

    return (
        <div
            onClick={(event) => onClick(event)}
            className={`top-0 left-0 w-full h-screen z-30 bg-white ${props.visible ? "fixed" : "hidden"}`}>
            <div
                ref={ref}
                className="w-full h-screen justify-center items-center flex">
                {props.children}
            </div>
        </div >
    );
}