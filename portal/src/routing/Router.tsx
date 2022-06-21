import { Route, Routes } from "react-router-dom";
import { UserInfoProps } from "../models";
import { LogoutPage, GamesPage, ScorePage, PlayersPage, DebugPage } from "../pages";

export function Router(props: UserInfoProps) {
    return (
        <Routes>
            <Route path="/" element={<ScorePage {...props} />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/players" element={<PlayersPage {...props} />} />
            <Route path="/debuginfo" element={<DebugPage {...props} />} />
            <Route path="/logout" element={<LogoutPage />} />
        </Routes>
    );
}