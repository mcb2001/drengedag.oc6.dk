import React from "react";
import { DefaultLayout, DefaultToastContainer, ErrorLoadingView, SpinnerContainer } from "./components";
import { Router } from "./routing";
import { useAuth0 } from "@auth0/auth0-react";
import { PlayerController } from "./controllers";
import { getDefaultPlayerDto, LoadState, PlayerDto } from "./models";
import { useLoadableState } from "./oc6";
import { PlayerContextProvider, SelfContextProvider, SpinnerContext, SpinnerContextProvider } from "./contexts";


function App() {
    const { loginWithRedirect, isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();

    const { setSpinnerVisibility } = React.useContext(SpinnerContext);

    if (!isLoading && !isAuthenticated) {
        loginWithRedirect();
        setSpinnerVisibility(true);
    }

    return (
        <>
            <SelfContextProvider>
                <PlayerContextProvider >
                    <DefaultLayout>
                        <Router />
                    </DefaultLayout>
                </PlayerContextProvider>
            </SelfContextProvider>
        </>
    );
}

export { App };
