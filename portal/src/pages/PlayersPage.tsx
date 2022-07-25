import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { toast } from "react-toastify";
import { EditPlayerForm, ErrorLoadingView, Headline, AddNewButton, Modal, InputForm, OutlinedButton } from "../components";
import { PlayerController } from "../controllers";
import { ButtonColor, getDefaultPlayerDto, HeadlineSize, LoadState, PlayerDto, UserInfoProps } from "../models";
import { useDocTitle, useLoadableState } from "../oc6";

function PlayersPage(props: UserInfoProps) {
    useDocTitle("Spillere");

    const { getAccessTokenSilently } = useAuth0();

    const [players, setPlayers, reloadPlayers] = useLoadableState<Array<PlayerDto>>([], props.setSpinnerVisible, async () => {
        const token = await getAccessTokenSilently();
        return await PlayerController.getAll(token);
    });

    const [modalVisible, setModalVisibility] = React.useState(false);

    const [email, setEmail] = React.useState("");

    if (players.state === LoadState.Error) {
        return <ErrorLoadingView loadableObject={players} />;
    }

    function addNewPlayer() {
        setModalVisibility(true);
    }

    async function update(player: PlayerDto): Promise<void> {
        try {
            props.setSpinnerVisible(true);

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

            props.setSpinnerVisible(false);

            toast.info("Spiller " + player.name + " opdateret");
        } catch (err) {
            props.setSpinnerVisible(false);

            console.log(err);

            reloadPlayers();

            toast.error("Spiller kunne ikke opdateres");
        }
    }

    async function createPlayer() {
        try {
            const player = { ...getDefaultPlayerDto(), email: email };

            props.setSpinnerVisible(true);
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

            props.setSpinnerVisible(false);

            toast.success("Spiller " + player.name + " oprettet");

            setModalVisibility(false);
        }
        catch (err) {
            props.setSpinnerVisible(false);

            console.log(err);

            reloadPlayers();

            toast.error("Spiller kunne ikke oprettes");
        }
    }

    async function deletePlayer(player: PlayerDto): Promise<void> {
        try {
            props.setSpinnerVisible(true);

            const token = await getAccessTokenSilently();

            await PlayerController.delete(player.id, token);

            setPlayers({
                ...players,
                value: [...players.value.filter((p: PlayerDto) => p.id !== player.id)]
            });

            props.setSpinnerVisible(false);

            toast.success("Spiller slettet");
        }
        catch (err) {
            props.setSpinnerVisible(false);

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
            <AddNewButton
                onClick={() => addNewPlayer()}
            />
            <Modal
                onClick={() => setModalVisibility(false)}
                visible={modalVisible}
            >
                <InputForm
                    label="Email"
                    type="text"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    readOnly={false} />
                <OutlinedButton
                    className="lg:w-2/12 w-full"
                    buttonColor={ButtonColor.Lime}
                    onClick={() => createPlayer()}
                >
                    Opret
                </OutlinedButton>
            </Modal>
        </div>
    );
}

export { PlayersPage };