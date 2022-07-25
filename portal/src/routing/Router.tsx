import React, { Children } from "react";
import { IndexRouteProps, LayoutRouteProps, PathRouteProps, Route, Routes, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogoutPage, GamesPage, PlayersPage, DebugPage, SelfPage, NoAccessPage } from "../pages";

export function Router() {
    const {self} =

    return (
        <Routes>
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/self" element={<SelfPage />} />
            <Route path="/debug" element={<DebugPage />} />

            {AuthenticatedRoute("/games", <GamesPage />, props.isAdmin)}
            {AuthenticatedRoute("/players", <PlayersPage />, props.isAdmin)}
        </Routes>
    );
}

function AuthenticatedRoute(path: string, element: JSX.Element, isAdmin: boolean) {
    return <Route path={path} element={isAdmin ? element : <NoAccessPage />} />;
}