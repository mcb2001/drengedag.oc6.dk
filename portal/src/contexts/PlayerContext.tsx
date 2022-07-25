import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { toast } from "react-toastify";
import { ErrorLoadingView, SpinnerContainer } from "../components";
import { PlayerController } from "../controllers";
import { LoadableObject, LoadState, PlayerDto } from "../models";

interface IPlayerContextProps {
    players: Array<PlayerDto>;
    reloadPlayers: () => void;
}

export const PlayerContext = React.createContext<IPlayerContextProps>({ players: [], reloadPlayers: () => { } });

interface IPlayerContextProviderProps extends React.PropsWithChildren {

}

export function PlayerContextProvider(props: IPlayerContextProviderProps) {
    const { getAccessTokenSilently } = useAuth0();

    const [players, setPlayers] = React.useState<LoadableObject<Array<PlayerDto>>>({
        value: [],
        state: LoadState.None
    });

    React.useEffect(() => {
        if (players.state === LoadState.None) {
            LoadPlayers();

            setPlayers({ ...players, state: LoadState.Loading });
        }
    }, [players]);

    async function LoadPlayers(): Promise<void> {
        try {
            const token = await getAccessTokenSilently();

            const value = await PlayerController.getAll(token);

            setPlayers({
                ...players,
                value,
                state: LoadState.Success
            });
        }
        catch (error) {
            setPlayers({
                ...players,
                state: LoadState.Error
            });

            toast.error("Kunne ikke loade spillere");
        }
    }

    switch (players.state) {
        case LoadState.Error: {
            return <ErrorLoadingView />;
        }
        case LoadState.Success: {
            return <PlayerContext.Provider
                children={props.children}
                value={
                    {
                        players: players.value,
                        reloadPlayers: () => LoadPlayers()
                    }
                } />;
        }
        case LoadState.None:
        case LoadState.Loading:
        default: {
            return <SpinnerContainer />;
        }
    }
}