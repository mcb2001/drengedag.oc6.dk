import React from "react";
import { toast } from "react-toastify";
import { Player } from "../models";
import { usePersistedState, validateArray } from "../util";

interface IPlayerContext {
    players: Array<Player>;
    addPlayer: (player: Player) => void;
    updatePlayer: (player: Player) => void;
}

const PlayerContext = React.createContext<IPlayerContext>({
    players: [],
    addPlayer: n => { },
    updatePlayer: p => { },
});

const { Consumer } = PlayerContext;

function PlayerContextProvider(props: React.PropsWithChildren<{}>) {
    const [players, setPlayers] = usePersistedState<Array<Player>>([], "PLAYERS", true, validateArray("id", "name"));

    function addPlayer(player: Player) {
        if (isInUse(player)) {
            return;
        }

        const maxPlayerId = players.reduce<number>((prev, cur) => (prev < cur.id ? cur.id : prev), 0);

        setPlayers([...players, {
            ...player,
            id: maxPlayerId + 1,
        }]);
    }

    function updatePlayer(player: Player) {
        if (isInUse(player)) {
            return;
        }

        setPlayers([...(players.filter(p => p.id !== player.id)), player]);
    }

    function isInUse(player: Player): boolean {
        const isUsed = players.reduce<boolean>((prev, cur) => prev || (cur.id !== player.id && cur.name.toUpperCase() === player.name.toUpperCase()), false);

        if (isUsed) {
            toast.warn("Invalid name");
        }

        return isUsed;
    }

    return (
        <PlayerContext.Provider
            value={{
                players: players,
                addPlayer: p => addPlayer(p),
                updatePlayer: p => updatePlayer(p)
            }}>
            {props.children}
        </PlayerContext.Provider>
    );
}

export { PlayerContextProvider, Consumer as PlayerContextConsumer };