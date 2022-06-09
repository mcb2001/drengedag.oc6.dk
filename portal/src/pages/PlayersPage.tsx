import React from "react";
import { PlayerContextConsumer } from "../contexts";
import { useDocTitle } from "../util";
import { EditablePlayerForm } from "../components";
import { Player } from "../models";

function PlayersPage() {
    useDocTitle("Spillere");

    return (
        <PlayerContextConsumer>
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
                    <div>
                        <span className="text-3xl font-bold underline">Spillere</span>
                        {[{ id: 0, name: "" }, ...players].sort((a, b) => a.id - b.id).map((player) =>
                            <EditablePlayerForm
                                submit={(player: Player) => submit(player)}
                                player={player}
                                key={player.id} />)}
                    </div>
                );
            }}
        </PlayerContextConsumer>
    );
}

export { PlayersPage };