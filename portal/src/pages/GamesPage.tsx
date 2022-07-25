import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Headline, AddNewButton } from "../components";
import { TeamController } from "../controllers";
import { TeamCreateResponse, UserInfoProps } from "../models";
import { useDocTitle, useLoadableState } from "../oc6";

export function GamesPage(props: UserInfoProps): JSX.Element {
    useDocTitle("Spil");

    const { getAccessTokenSilently } = useAuth0();

    const [teams, setTeam, reloadTeams] = useLoadableState<TeamCreateResponse>({
        teamCount: 0,
        teams: []
    }, props.setSpinnerVisible, async () => {
        const token = await getAccessTokenSilently();
        return await TeamController.get(token);
    });

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

    return ( 
        <>
            TEAMS
        </>
    );
}
