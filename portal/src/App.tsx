import React from "react";
import { Player } from "./models";
import { DefaultLayout, DefaultToastContainer } from "./components";
import { Router } from "./routing";
import { useAuth0 } from "@auth0/auth0-react";

import { PlayerContextProvider } from "./contexts";

function App() {
    const { loginWithRedirect, isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();
    const [accessToken, setAccessToken] = React.useState<string | null>(null);

    React.useEffect(() => {
        const getJwt = async () => {
            try {
                const newAccessToken = await getAccessTokenSilently();

                setAccessToken(newAccessToken);
            } catch (e) {
                console.log(e);
            }
        };

        getJwt();
    }, [accessToken, getAccessTokenSilently]);

    if (!isLoading && !isAuthenticated) {
        loginWithRedirect();
    }

    return (
        <PlayerContextProvider>
            <DefaultLayout>
                <DefaultToastContainer />
                <Router />
                <p>
                    {user?.email}
                </p>
                <hr />
                <textarea
                    rows={20}
                    cols={100}
                    value={accessToken ? "Bearer " + accessToken : ""} />
            </DefaultLayout>
        </PlayerContextProvider>
    );
}

export { App };