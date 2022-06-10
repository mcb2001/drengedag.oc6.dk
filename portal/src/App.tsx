import React from "react";
import { Player } from "./models";
import { DefaultLayout, DefaultToastContainer } from "./components";
import { Router } from "./routing";

import { PlayerContextProvider } from "./contexts";

function App() {
    return (
        <PlayerContextProvider>
            <DefaultLayout>
                <DefaultToastContainer />
                <Router />
            </DefaultLayout>
        </PlayerContextProvider>
    );
}

export { App };