import React from "react";
import { Headline } from "../components";
import { HeadlineSize } from "../models";
import { useDocTitle } from "../oc6";

export function GamesPage(): JSX.Element {
    useDocTitle("Spil");

    return (
        <Headline size={HeadlineSize.H1}>Spil</Headline>
    );
}
