import { Route, Routes } from "react-router-dom";
import { FrontPage, TeamsPage, PlayersPage, DebugInfo } from "../pages";
import { UserInfoProps } from "../oc6";

export function Router(props: UserInfoProps) {
    return (
        <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/debuginfo" element={<DebugInfo {...props} />} />
        </Routes>
    );
}