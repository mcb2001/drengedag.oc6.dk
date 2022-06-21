import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { ErrorLoadingView, Headline } from "../components";
import { PlayerController } from "../controllers";
import { HeadlineSize, LoadState, PlayerDto, UserInfoProps } from "../models";
import { useDocTitle, useLoadableState } from "../oc6";

export function ScorePage(props: UserInfoProps): JSX.Element {
    useDocTitle("Forside");

    const { getAccessTokenSilently } = useAuth0();

    const [players, setPlayers] = useLoadableState<Array<PlayerDto>>([], async () => {
        const token = await getAccessTokenSilently();
        return await PlayerController.getAll(token);
    });

    function render() {
        return (
            <div className="flex flex-col">
                <Headline size={HeadlineSize.H1}>Stilling</Headline>
                <div className="flex flex-col">
                    <PlayerScore name="Navn" wins="Vundet" points="Score" />
                    {players.value
                        .sort((a: PlayerDto, b: PlayerDto) => {
                            if (a.points === b.points) {
                                return a.wins - b.wins;
                            }

                            return a.points - b.points;
                        })
                        .map((player: PlayerDto, index: number) => (
                            <PlayerScore
                                {...player}
                                key={player.id} />
                        ))}
                </div>
            </div>
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

interface IPlayerScoreProps {
    name: string;
    wins: string | number;
    points: string | number;
}

function PlayerScore({ name, wins, points }: IPlayerScoreProps) {

    return (
        <div className="flex flex-row justify-start odd:bg-blue-200">
            <div className="w-2/3">
                {name}
            </div>
            <div className="w-1/6">
                {wins}
            </div>
            <div className="w-1/6">
                {points}
            </div>
        </div>
    );
}