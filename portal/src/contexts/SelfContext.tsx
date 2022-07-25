import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { ErrorLoadingView, SpinnerContainer } from "../components";
import { PlayerController } from "../controllers";
import { getDefaultPlayerDto, LoadableObject, LoadState, PlayerDto } from "../models";
import { SpinnerContext } from "./SpinnerContext";

export const SelfContext = React.createContext<PlayerDto>(getDefaultPlayerDto());

interface ISelfContextProps extends React.PropsWithChildren {

}

export function SelfContextProvider(props: ISelfContextProps) {
    const { getAccessTokenSilently } = useAuth0();
    const { setSpinnerVisibility } = React.useContext(SpinnerContext);

    const [self, setSelf] = React.useState<LoadableObject<PlayerDto>>({
        value: getDefaultPlayerDto(),
        state: LoadState.None
    });

    React.useEffect(() => {
        if (self.state === LoadState.None) {
            LoadSelf();

            setSelf({ ...self, state: LoadState.Loading });
        }
    }, [self]);

    async function LoadSelf(): Promise<void> {
        try {
            const token = await getAccessTokenSilently();

            const value = await PlayerController.self(token);

            setSelf({
                ...self,
                value,
                state: LoadState.Success
            });
        }
        catch (error) {
            setSelf({
                ...self,
                state: LoadState.Error
            });
        }

        setSpinnerVisibility(false);
    }

    switch (self.state) {
        case LoadState.Error: {
            return <ErrorLoadingView />;
        }
        case LoadState.Success: {
            return <SelfContext.Provider value={self.value} />;
        }
        case LoadState.None:
        case LoadState.Loading:
        default: {
            setSpinnerVisibility(true);
            return <></>;
        }
    }
}