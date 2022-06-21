import React from "react";
import { UserInfoProps } from "../models";
import { Menu } from "./Menu";

export function DefaultLayout(props: UserInfoProps) {
    const { children } = props;

    return (
        <div>
            < Menu {...props} />
            <div className="flex flex-col justify-start items-center z-10">
                <div className="container p-4" >
                    {children}
                </div>
            </div>
        </div>
    );
}