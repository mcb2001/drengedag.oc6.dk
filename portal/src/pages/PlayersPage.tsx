import React from "react";
import { PlayerContext } from "../App";
import { useDocTitle } from "../util";
import { EditablePlayerForm } from "../components";
import { Player } from "../models";

function PlayersPage() {
    useDocTitle("Spillere");

    return (
        <PlayerContext.Consumer>
            {({ players, addPlayer, updatePlayer }) => {
                function submit(player: Player) {
                    if (player.id === 0) {
                        return addPlayer(player);
                    }
                    else {
                        updatePlayer(player);
                        return false;
                    }
                }

                return (
                    <div className="players">
                        <h1>Spillere</h1>
                        {[{ id: 0, name: "" }, ...players].sort((a, b) => a.id - b.id).map((player) =>
                            <EditablePlayerForm
                                submit={(player: Player) => submit(player)}
                                player={player}
                                key={player.id} />)}
                    </div>
                );
            }}
        </PlayerContext.Consumer>
    );
}

export { PlayersPage };