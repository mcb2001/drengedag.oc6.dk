import React from "react";
import { Route, Routes } from "react-router-dom";
import { FrontPage } from "../pages/FrontPage";
import { BoldPage } from "../pages/BoldPage";

export function Router(props: React.PropsWithChildren<{}>) {
    return (
        <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/bold" element={<BoldPage />} />
        </Routes>
    );
}