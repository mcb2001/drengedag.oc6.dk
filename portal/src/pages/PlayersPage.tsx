import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { toast } from "react-toastify";
import { ErrorLoadingView, Headline, AddNewButton, Modal, OutlinedButton } from "../components";
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

    return (
        <>
            Spillere
        </>
    );
}

export { PlayersPage };