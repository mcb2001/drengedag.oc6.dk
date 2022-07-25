import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { toast } from "react-toastify";
import { ErrorLoadingView, SpinnerContainer } from "../components";
import { PlayerController } from "../controllers";
import { getDefaultPlayerDto, LoadableObject, LoadState, PlayerDto } from "../models";
import { PlayerContext } from "./PlayerContext";

interface ISelfContextProps {
    self: PlayerDto;
    updateSelf: (player: PlayerDto) => void;
}

export const SelfContext = React.createContext<ISelfContextProps>({
    self: getDefaultPlayerDto(),
    updateSelf: () => { }
});

interface ISelfContextProviderProps extends React.PropsWithChildren {

}

export function SelfContextProvider(props: ISelfContextProviderProps) {
    const { getAccessTokenSilently } = useAuth0();

    const { reloadPlayers } = React.useContext(PlayerContext);

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

            toast.error("Kunne ikke loade profil");
        }
    }

    async function updateSelf(player: PlayerDto): Promise<void> {
        try {
            const token = await getAccessTokenSilently();

            const value = await PlayerController.updateSelf(player, token);

            setSelf({
                ...self,
                value,
                state: LoadState.Success
            });

            reloadPlayers();

            toast.info("Profil opdateret");
        }
        catch (error) {
            setSelf({
                ...self,
                state: LoadState.Error
            });

            toast.error("Kunne ikke opdatere profil");
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
                        updateSelf: (player: PlayerDto) => updateSelf(player)
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