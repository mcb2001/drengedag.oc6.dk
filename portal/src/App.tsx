import React from "react";
import { Player } from "./models";
import { DefaultLayout } from "./components";
import { Router } from "./routing";

interface IPlayerContext {
    players: Array<Player>;
    addPlayer: (name: string) => void;
}

const PlayerContext = React.createContext<IPlayerContext>({
    players: [],
    addPlayer: n => { }
});

function App() {

    const [players, setPlayers] = React.useState<Array<Player>>([]);

    function addPlayer(name: string) {
        setPlayers([...players, {
            name: name
        }]);
    }

    return (
        <PlayerContext.Provider value={{
            players: players,
            addPlayer: (name: string) => addPlayer(name)
        }}>
            <DefaultLayout>
                <Router />
            </DefaultLayout>
        </PlayerContext.Provider>
    );
}

export { App, PlayerContext };