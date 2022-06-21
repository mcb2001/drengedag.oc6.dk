import React from "react";
import { DefaultLayout, DefaultToastContainer, ErrorLoadingView } from "./components";
import { Router } from "./routing";
import { useAuth0 } from "@auth0/auth0-react";
import { PlayerController } from "./controllers";
import { getDefaultPlayerDto, LoadState, PlayerDto } from "./models";
import { useLoadableState } from "./oc6";

function App() {
    const { loginWithRedirect, isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();

    const [self, setSelf] = useLoadableState<PlayerDto>(getDefaultPlayerDto(), async () => {
        const token = await getAccessTokenSilently();
        return await PlayerController.self(token);
    });

    const showLoading: () => JSX.Element = () => <h1>Logging in...</h1>;

    if (!isLoading && !isAuthenticated) {
        loginWithRedirect();
        return showLoading();
    }

    function render() {
        return <Router {...userInfoProps} />;
    }

    function selectRender() {
        if (self.state === LoadState.Success) {
            return render();
        }
        else if (self.state === LoadState.Error) {
            return <ErrorLoadingView loadableObject={self} />;
        }
        else {
            return <h1>Indlæser...</h1>;
        }
    }

    const userInfoProps = {
        self: self.value
    };

    return (
        <DefaultLayout {...userInfoProps}>
            <DefaultToastContainer />
            {selectRender()}
        </DefaultLayout>
    );
}

export { App };
