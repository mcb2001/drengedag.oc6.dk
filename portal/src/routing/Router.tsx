import React from "react";
import { Route, Routes } from "react-router-dom";
import { FrontPage } from "../pages/FrontPage";

export function Router(props: React.PropsWithChildren<{}>) {
    return (
        <Routes>
            <Route path="/" element={<FrontPage />} />
        </Routes>
    );
}