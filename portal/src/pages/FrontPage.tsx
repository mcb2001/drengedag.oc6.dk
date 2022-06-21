import React from "react";
import { ErrorLoadingView, Headline } from "../components";
import { PlayerController } from "../controllers";
import { HeadlineSize, LoadState, PlayerDto, UserInfoProps } from "../models";
import { useDocTitle, useLoadableState } from "../oc6";

function FrontPage(props: UserInfoProps): JSX.Element {
    useDocTitle("Forside");
    const [players, setPlayers] = useLoadableState<Array<PlayerDto>>([], async () => {
        const token = await props.getToken();
        return await PlayerController.getAll(token);
    });

    function render() {
        return (
            <>
                <Headline size={HeadlineSize.H1}>Stilling</Headline>
                <div>
                    {players.value
                        .sort((a: PlayerDto, b: PlayerDto) => {
                            if (a.points === b.points) {
                                return a.wins - b.wins;
                            }

                            return a.points - b.points;
                        })
                        .map((player: PlayerDto, index: number) => (
                            <Headline
                                size={HeadlineSize.H2}
                                key={player.id}>
                                {player.name}
                            </Headline>
                        ))}
                </div>
            </>
        );
    }

    switch (players.state) {
        case LoadState.Error: {
            return <ErrorLoadingView loadableObject={players} />;
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
