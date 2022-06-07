import { Route, Routes } from "react-router-dom";
import { FrontPage, TeamsPage, PlayersPage } from "../pages";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/players" element={<PlayersPage />} />
        </Routes>
    );
}