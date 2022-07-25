import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { toast } from "react-toastify";
import { ErrorLoadingView, Headline, AddNewButton, Modal, OutlinedButton } from "../components";
import { PlayerController } from "../controllers";
import { ButtonColor, getDefaultPlayerDto, HeadlineSize, LoadState, PlayerDto } from "../models";
import { useDocTitle } from "../oc6";

function PlayersPage() {
    useDocTitle("Spillere");

    return (
        <>
            Spillere
        </>
    );
}

export { PlayersPage };