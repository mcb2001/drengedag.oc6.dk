import React from "react";
import { Menu } from "./";

function DefaultLayout(props: React.PropsWithChildren<{}>) {
    const { children } = props;

    return (
        <div className="app">
            <div className="content" >
                {children}
            </div>
            < Menu />
        </div>
    );
}

export { DefaultLayout };