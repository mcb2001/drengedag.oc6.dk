import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { toast } from "react-toastify";
import { EditPlayerForm, ErrorLoadingView, Headline } from "../components";
import { PlayerController } from "../controllers";
import { getDefaultPlayerDto, HeadlineSize, LoadState, PlayerDto, UserInfoProps } from "../models";
import { useDocTitle, useLoadableState } from "../oc6";

function PlayersPage(props: UserInfoProps) {
    useDocTitle("Spillere");

    const { getAccessTokenSilently } = useAuth0();

    const [players, setPlayers, reloadPlayers] = useLoadableState<Array<PlayerDto>>([], async () => {
        const token = await getAccessTokenSilently();
        const newPlayers = await PlayerController.getAll(token);
        return [getDefaultPlayerDto(), ...newPlayers];
    });

    if (players.state === LoadState.Error) {
        return <ErrorLoadingView loadableObject={players} />;
    }

    async function update(player: PlayerDto): Promise<void> {
        if (player.id <= 0) {
            try {
                const token = await getAccessTokenSilently();

                const newPlayer = await PlayerController.post({
                    ...player,
                    id: 0,
                }, token);

                const filteredPlayers = players.value.filter((p: PlayerDto) => p.id !== player.id);

                const newPlayers = [
                    getDefaultPlayerDto(),
                    newPlayer,
                    ...filteredPlayers
                ].sort((a: PlayerDto, b: PlayerDto) => a.id - b.id);

                setPlayers({
                    ...players,
                    value: newPlayers
                });

                toast.success("Spiller " + player.name + " oprettet");
            }
            catch (err) {
                console.log(err);

                reloadPlayers();

                toast.error("Spiller kunne ikke oprettes");
            }
        }
        else {
            try {
                const token = await getAccessTokenSilently();

                const updatedPlayer = await PlayerController.put(player, token);

                const filteredPlayers = players.value.filter((p: PlayerDto) => p.id !== player.id);

                const updatedPlayers = [
                    updatedPlayer,
                    ...filteredPlayers
                ].sort((a: PlayerDto, b: PlayerDto) => a.id - b.id);

                setPlayers({
                    ...players,
                    value: updatedPlayers
                });

                toast.info("Spiller " + player.name + " opdateret");
            } catch (err) {
                console.log(err);

                reloadPlayers();

                toast.error("Spiller kunne ikke opdateres");
            }
        }
    }

    async function deletePlayer(player: PlayerDto): Promise<void> {
        try {
            const token = await getAccessTokenSilently();

            await PlayerController.delete(player.id, token);

            setPlayers({
                ...players,
                value: [...players.value.filter((p: PlayerDto) => p.id !== player.id)]
            });
        }
        catch (err) {
            console.log(err);

            reloadPlayers();

            toast.error("Spiller kunne slettes");
        }
    }

    return (
        <div>
            <Headline size={HeadlineSize.H1}>Spillere</Headline>
            {players.value.map((player: PlayerDto, index: number) =>
                <EditPlayerForm
                    key={player.id}
                    player={player}
                    update={(p: PlayerDto) => update(p)}
                    delete={(p: PlayerDto) => deletePlayer(p)}
                />)}
        </div>
    );
}

export { PlayersPage };