import React from "react";
import { PlayerContext } from "../App";
import { useDocTitle } from "../util";
import { PlayerView } from "../components";

function PlayersPage() {
    useDocTitle("Spillere");

    const [name, setName] = React.useState<string>("");

    return (
        <PlayerContext.Consumer>
            {({ players, addPlayer }) => {
                return (
                    <div className="players">
                        <h1>Spillere</h1>
                        <div>
                            <label>
                                Navn:
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)} />
                            </label>
                            <button
                                type="button"
                                onClick={() => addPlayer(name)}>
                                Tilføj
                            </button>
                        </div>
                        {players.map((player, index) => <PlayerView
                            player={player}
                            key={index} />)}
                    </div>
                );
            }}
        </PlayerContext.Consumer>
    );
}

export { PlayersPage };