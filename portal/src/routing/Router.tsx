import React from "react";
import { Route, Routes } from "react-router-dom";
import { LogoutPage, TeamsPage, PlayersPage, DebugPage, SelfPage } from "../pages";

export function Router() {
    return (
        <Routes>
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/self" element={<SelfPage />} />
            <Route path="/debug" element={<DebugPage />} />
            <Route path="/" element={<PlayersPage />} />
            <Route path="/games" element={<TeamsPage />} />
        </Routes>
    );
}