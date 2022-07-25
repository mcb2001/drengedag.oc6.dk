import React from "react";
import { Menu } from "./Menu";

interface IDefaultLayoutProps extends React.PropsWithChildren {

}

export function DefaultLayout(props: IDefaultLayoutProps) {
    const { children } = props;

    return (
        <div>
            <Menu />
            <div className="flex flex-col justify-start items-center z-10">
                <div className="container p-4" >
                    {children}
                </div>
            </div>
        </div>
    );
}