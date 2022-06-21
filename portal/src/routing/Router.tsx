import React, { Children } from "react";
import { IndexRouteProps, LayoutRouteProps, PathRouteProps, Route, Routes, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserInfoProps } from "../models";
import { LogoutPage, GamesPage, ScorePage, PlayersPage, DebugPage, SelfPage, NoAccessPage } from "../pages";

export function Router(props: UserInfoProps) {
    return (
        <Routes>
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/" element={<ScorePage {...props} />} />
            <Route path="/self" element={<SelfPage {...props} />} />

            {AuthenticatedRoute("/games", <GamesPage />, props.self.isAdmin)}
            {AuthenticatedRoute("/players", <PlayersPage {...props} />, props.self.isAdmin)}
            {AuthenticatedRoute("/debuginfo", <DebugPage {...props} />, props.self.isAdmin)}
        </Routes>
    );
}

const AuthenticatedRoute = (path: string, element: JSX.Element, isAdmin: boolean) =>
    <Route path={path} element={isAdmin ? element : <NoAccess />} />;

function NoAccess() {
    React.useEffect(() => {
        toast.error("Du har desværre ikke adgang til denne side");
    });
    return <NoAccessPage />;
}