import React from "react";
import { DefaultLayout, DefaultToastContainer } from "./components";
import { Router } from "./routing";
import { useAuth0 } from "@auth0/auth0-react";

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

    const showLoading: () => JSX.Element = () => <h1>Logging in...</h1>;

    if (!isLoading && !isAuthenticated) {
        loginWithRedirect();
        return showLoading();
    }

    if (!accessToken) {
        return showLoading();
    }

    return (
        <DefaultLayout>
            <DefaultToastContainer />
            <Router accessToken={accessToken} />

        </DefaultLayout>
    );
}

export { App };
