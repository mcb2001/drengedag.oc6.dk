import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { GameView, Headline } from "../components";
import { GameController } from "../controllers";
import { GameDto, getDefaultGameDto, HeadlineSize, UserInfoProps } from "../models";
import { useDocTitle, useLoadableState } from "../oc6";

export function GamesPage(props: UserInfoProps): JSX.Element {
    useDocTitle("Spil");

    const { getAccessTokenSilently } = useAuth0();

    const [games, setGames, reloadGames] = useLoadableState<Array<GameDto>>([], props.setSpinnerVisible, async () => {
        const token = await getAccessTokenSilently();
        return await GameController.getAll(token);
    });

    return (
        <>
            {games.value.map((game) => <GameView
                key={game.id}
                game={game}
            />)}
        </>
    );
}
