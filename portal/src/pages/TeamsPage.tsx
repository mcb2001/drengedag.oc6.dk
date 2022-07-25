import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Headline, AddNewButton } from "../components";
import { TeamController } from "../controllers";
import { TeamCreateResponse } from "../models";
import { useDocTitle } from "../oc6";

export function TeamsPage(): JSX.Element {
    useDocTitle("Spil");

    return (
        <>
            Spil
        </>
    );
}
