import React from "react";
import { EditPlayerForm, ErrorLoadingView } from "../components";
import { PlayerController } from "../controllers";
import { getDefaultPlayerDto, LoadState, PlayerDto, UserInfoProps } from "../models";
import Oc6 from "../oc6";

function PlayersPage(props: UserInfoProps) {
    Oc6.useDocTitle("Spillere");

    const [players, setPlayers] = Oc6.useLoadableState<Array<PlayerDto>>([], async () => {
        const token = await props.getToken();
        const newPlayers = await PlayerController.getAll(token);
        return [getDefaultPlayerDto(), ...newPlayers];
    });

    if (players.state === LoadState.Error) {
        return <ErrorLoadingView loadableObject={players} />;
    }

    console.log(players);

    return (
        <div>
            <h1>Spillere</h1>
            {players.value.map((player: PlayerDto, index: number) =>
                <EditPlayerForm
                    player={player}
                    update={(p: PlayerDto) => p}
                    delete={(p: PlayerDto) => { }}
                />)}
        </div>
    );
}

export { PlayersPage };