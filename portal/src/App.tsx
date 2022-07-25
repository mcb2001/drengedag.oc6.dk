import React from "react";
import { DefaultLayout, DefaultToastContainer, ErrorLoadingView, SpinnerContainer } from "./components";
import { Router } from "./routing";
import { useAuth0 } from "@auth0/auth0-react";
import { PlayerContextProvider, SelfContextProvider } from "./contexts";

function App() {
    const { loginWithRedirect, isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();

    if (!isLoading && !isAuthenticated) {
        loginWithRedirect();
        return <SpinnerContainer />;
    }

    return (
        <>
            <PlayerContextProvider >
                <SelfContextProvider>
                    <DefaultLayout>
                        <Router />
                    </DefaultLayout>
                </SelfContextProvider>
            </PlayerContextProvider>
        </>
    );
}

export { App };
