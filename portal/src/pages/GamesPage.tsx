import React from "react";
import { Headline } from "../components";
import { HeadlineSize, UserInfoProps } from "../models";
import { useDocTitle } from "../oc6";

export function GamesPage({ setSpinnerVisible }: UserInfoProps): JSX.Element {
    useDocTitle("Spil");

    function spin() {
        setSpinnerVisible(true);

        window.setTimeout(() => setSpinnerVisible(false), 3400);
    }

    return (
        <>
            <Headline size={HeadlineSize.H1}>Spil</Headline>
            <button type="button" onClick={() => spin()}>
                Toogle spinner
            </button>
        </>
    );
}
