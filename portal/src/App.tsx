import React from "react";
import { Player } from "./models";
import { DefaultLayout } from "./components";
import { Router } from "./routing";
import { usePersistedState, validateArray } from "./util";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function App() {
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
        <PlayerContext.Provider value={{
            players: players,
            addPlayer: p => addPlayer(p),
            updatePlayer: p => updatePlayer(p)
        }}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false} />
            <DefaultLayout>
                <Router />
            </DefaultLayout>
        </PlayerContext.Provider>
    );
}

export { App, PlayerContext };