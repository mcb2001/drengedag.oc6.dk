import React from "react";
import { ErrorLoadingView } from "../components";
import { PlayerController } from "../controllers";
import { LoadState, PlayerDto, UserInfoProps } from "../models";
import Oc6 from "../oc6";

function FrontPage(props: UserInfoProps): JSX.Element {
    Oc6.useDocTitle("Forside");
    const [players, setPlayers] = Oc6.useLoadableState<Array<PlayerDto>>([], async () => {
        const token = await props.getToken();
        return await PlayerController.getAll(token);
    });

    function render() {
        return (
            <>
                <h1>Forside</h1>
                <div>
                    {players.value
                        .sort((a: PlayerDto, b: PlayerDto) => {
                            if (a.points === b.points) {
                                return a.wins - b.wins;
                            }

                            return a.points - b.points;
                        })
                        .map((player: PlayerDto, index: number) => {
                            return <h2>{player.name}</h2>;
                        })}
                </div>
            </>
        );
    }

    switch (players.state) {
        case LoadState.Error: {
            return <ErrorLoadingView loadableObject={players}/>;
        }
        case LoadState.Success: {
            return render();
        }
        case LoadState.None:
        case LoadState.Loading:
        default: {
            return <h1>Indlæser...</h1>;
        }
    }
}

export { FrontPage };
