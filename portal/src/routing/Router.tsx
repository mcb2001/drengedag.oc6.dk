import { Route, Routes } from "react-router-dom";
import { UserInfoProps } from "../models";
import { FrontPage, TeamsPage, PlayersPage, DebugPage } from "../pages";
import { GamesPage } from "../pages/GamesPage";
import { LogoutPage } from "../pages/LogoutPage";

export function Router(props: UserInfoProps) {
    return (
        <Routes>
            <Route path="/" element={<FrontPage {...props} />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/players" element={<PlayersPage {...props} />} />
            <Route path="/debuginfo" element={<DebugPage {...props} />} />
            <Route path="/logout" element={<LogoutPage />} />
        </Routes>
    );
}