import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { ErrorLoadingView, SpinnerContainer } from "../components";
import { PlayerController } from "../controllers";
import { getDefaultPlayerDto, LoadableObject, LoadState, PlayerDto } from "../models";

interface ISelfContextProps {
    self: PlayerDto;
    reloadSelf: () => void;
}

export const SelfContext = React.createContext<ISelfContextProps>({
    self: getDefaultPlayerDto(),
    reloadSelf: () => { }
});

interface ISelfContextProviderProps extends React.PropsWithChildren {

}

export function SelfContextProvider(props: ISelfContextProviderProps) {
    const { getAccessTokenSilently } = useAuth0();

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

            console.log("self loaded");
        }
        catch (error) {
            setSelf({
                ...self,
                state: LoadState.Error
            });
        }
    }

    switch (self.state) {
        case LoadState.Error: {
            return <ErrorLoadingView />;
        }
        case LoadState.Success: {
            return <SelfContext.Provider
                value={
                    {
                        self: self.value,
                        reloadSelf: () => LoadSelf()
                    }
                }
                children={props.children}
            />;
        }
        case LoadState.None:
        case LoadState.Loading:
        default: {
            return <SpinnerContainer />;
        }
    }
}