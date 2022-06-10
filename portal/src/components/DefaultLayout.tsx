import React from "react";
import { Menu } from "./";

function DefaultLayout(props: React.PropsWithChildren<{}>) {
    const { children } = props;

    return (
            <div className="app">
                < Menu />
                <div className="content" >
                    {children}
                </div>
            </div>
    );
}

export { DefaultLayout };