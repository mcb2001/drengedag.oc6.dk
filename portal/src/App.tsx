import React from "react";
import { DefaultLayout, DefaultToastContainer, ErrorLoadingView, SpinnerContainer } from "./components";
import { Router } from "./routing";
import { useAuth0 } from "@auth0/auth0-react";
import { PlayerController } from "./controllers";
import { getDefaultPlayerDto, LoadState, PlayerDto, UserInfoProps } from "./models";
import { useLoadableState } from "./oc6";

function App() {
    const { loginWithRedirect, isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();

    const [visible, setVisible] = React.useState<boolean>(false);

    const [self, setSelf, reloadSelf] = useLoadableState<PlayerDto>(getDefaultPlayerDto(), setVisible, async () => {
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

    const userInfoProps: UserInfoProps = {
        self: self.value,
        reloadSelf: async () => reloadSelf(),
        setSpinnerVisible: (visible: boolean) => setVisible(visible)
    };

    return (
        <>
            <SpinnerContainer visible={visible} />
            <DefaultLayout {...userInfoProps}>
                <DefaultToastContainer />
                {selectRender()}
            </DefaultLayout>
        </>
    );
}

export { App };
